// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract LandTransfer {

    address public landInspector;

    enum Status { notForSale, forSale, inProgress, sold }

    uint propertyCount = 0;

    struct propertyDetail {
        uint propertyId;
        string ipfsHash;
        // string phone;
        string location;
        address seller;
        uint cost;
        Status status;
    }

    mapping(uint => propertyDetail) public properties;

    function registerLand (string memory _hash, string memory _location, uint _cost) public {
        require(bytes(_hash).length > 0, "Invalid document IPFS hash");
        require(_cost > 0, "Invalid rate for a property.");
        propertyCount ++;
        properties[propertyCount] = propertyDetail(propertyCount, _hash, _location, msg.sender, _cost, Status.forSale);
    }

    uint requestCount = 0;

    struct purchaseRequest {
        uint requestId;
        uint propertyId;
        address owner;
        address buyer;
        bool rejected;
        bool successful;
    }

    mapping(uint => purchaseRequest) public requests;

    function sendRequest (uint _propId) public {
        propertyDetail memory p = properties[_propId];
        require(p.seller!=msg.sender, "Land Owner cannot request purchase for his own land.");
        require(p.status!=Status.sold, "Land is already sold to another buyer.");
        requestCount ++;
        requests[requestCount] = purchaseRequest(requestCount, _propId, p.seller, msg.sender, false, false);
        p.status = Status.inProgress;
    }
}