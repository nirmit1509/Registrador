// SPDX-License-Identifier: MIT

//commit 90b97dfe35397f16b9e60b06379def8dcbb0008f

pragma solidity >=0.4.22 <0.8.0;

contract LandTransfer {

    address payable public registrar = msg.sender;

    enum Status { notForSale, forSale, inProgress, sold }

    uint public propertyCount = 0;

    struct propertyDetail {
        uint propertyId;
        string ipfsHash;
        string phone;
        string location;
        address payable seller;
        uint cost;
        Status status;
    }

    mapping(uint => propertyDetail) public properties;

    function registerLand (string memory _hash, string memory _location, uint _cost, string memory _phone) 
    public {
        require(bytes(_hash).length > 0, "Invalid document IPFS hash");
        require(_cost > 0, "Invalid rate for a property.");
        propertyCount ++;
        properties[propertyCount] = propertyDetail(propertyCount, _hash, _phone, _location, msg.sender, _cost, Status.forSale);
    }

    function changeOwnership(uint _propId, address payable _newOwner, uint _requestId) internal {
        propertyDetail storage p = properties[_propId];
        purchaseRequest storage r = requests[_requestId];
        require(p.status!=Status.sold, "Land is already sold to another buyer.");
        require(p.status!=Status.notForSale, "This land is no longer available for purchase");
        p.seller = _newOwner;
        r.owner = _newOwner;
        p.status = Status.notForSale;
        p.phone = "";
        r.sold = true;
    }

    uint public requestCount = 0;

    struct purchaseRequest {
        uint requestId;
        uint propertyId;
        address payable owner;
        address payable buyer;
        string location;
        uint cost;
        string ipfsHash;
        bool ownerApproved;
        bool registrarApproved;
        bool ownerRejected;
        bool registrarRejected;
        bool sold;
    }

    mapping(uint => purchaseRequest) public requests;

    function sendRequest (uint _propId) public payable {
        propertyDetail storage p = properties[_propId];
        require(p.seller!=msg.sender, "Land Owner cannot request purchase for his own land.");
        require(p.status!=Status.sold, "Land is already sold to another buyer.");
        require(p.status!=Status.notForSale, "This land is no longer available for purchase");
        (p.seller).transfer(msg.value);
        requestCount ++;
        requests[requestCount] = purchaseRequest(requestCount, _propId, p.seller, msg.sender, p.location, p.cost, p.ipfsHash, false, false, false, false, false);
        p.status = Status.inProgress;
    }

    function ownerApproval (uint _requestId) public payable {
        purchaseRequest storage r = requests[_requestId];
        require(msg.sender==r.owner, "You are not the owner of the land requested");
        r.ownerApproved = true;
        registrar.transfer(msg.value);
        //send notification to Land Registrar
    }

    function ownerRejection (uint _requestId) public payable {
        purchaseRequest storage r = requests[_requestId];
        require(msg.sender==r.owner, "You are not the owner of the land requested");
        r.ownerRejected = true;
        (r.buyer).transfer(msg.value);
        //send notification to Requester
    }

    function registrarApproval (uint _requestId) public payable {
        purchaseRequest storage r = requests[_requestId];
        require(r.ownerRejected==false, "Owner unwilling to sell his land to this requester.");
        require(r.ownerApproved==true, "Owner unwilling to sell his land to this requester.");
        r.registrarApproved = true;
        (r.owner).transfer(msg.value);
        //change the ownership of land function call
        changeOwnership(r.propertyId, r.buyer, _requestId);
    }

    function registrarRejection (uint _requestId) public payable {
        purchaseRequest storage r = requests[_requestId];
        r.registrarRejected = true;
        (r.buyer).transfer(msg.value);
        //send notification to Requester
    }
    
}