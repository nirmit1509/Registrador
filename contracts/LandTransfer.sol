// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract LandTransfer {

    address public registrar = 0xE6224E87d1b139aE578bB74e337089aCC7D8514B;

    // constructor (address _registrar) public {
    //     registrar = _registrar;
    // }

    enum Status { notForSale, forSale, inProgress, sold }

    uint public propertyCount = 0;

    struct propertyDetail {
        uint propertyId;
        string ipfsHash;
        string phone;
        string location;
        address seller;
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

    function changeOwnership(uint _propId, address _newOwner) internal {
        propertyDetail storage p = properties[_propId];
        require(p.status!=Status.sold, "Land is already sold to another buyer.");
        require(p.status!=Status.notForSale, "This land is no longer available for purchase");
        p.seller = _newOwner;
        p.status = Status.notForSale;
        p.phone = "";
    }

    uint public requestCount = 0;

    struct purchaseRequest {
        uint requestId;
        uint propertyId;
        address owner;
        address buyer;
        bool ownerApproved;
        bool rejected;
        bool successful;
    }

    mapping(uint => purchaseRequest) public requests;

    function sendRequest (uint _propId) public {
        propertyDetail storage p = properties[_propId];
        require(p.seller!=msg.sender, "Land Owner cannot request purchase for his own land.");
        require(p.status!=Status.sold, "Land is already sold to another buyer.");
        require(p.status!=Status.notForSale, "This land is no longer available for purchase");
        requestCount ++;
        requests[requestCount] = purchaseRequest(requestCount, _propId, p.seller, msg.sender, false, false, false);
        p.status = Status.inProgress;
    }

    function ownerApproval (uint _requestId) public {
        purchaseRequest storage r = requests[_requestId];
        require(msg.sender==r.owner, "You are not the owner of the land requested");
        r.ownerApproved = true;
        //send notification to Land Registrar
    }

    function ownerRejection (uint _requestId) public {
        purchaseRequest storage r = requests[_requestId];
        require(msg.sender==r.owner, "You are not the owner of the land requested");
        r.rejected = true;
        r.successful = false;
        //send notification to Requester
    }

    function registrarApproval (uint _requestId) public {
        purchaseRequest storage r = requests[_requestId];
        require(r.rejected==false, "Owner unwilling to sell his land to this requester.");
        require(r.ownerApproved==true, "Owner unwilling to sell his land to this requester.");
        // Check whether msg.sender is the land registrar
        // require(msg.sender==r.owner, "You are not the owner of the land requested");
        r.successful = true;
        r.rejected = false;
        //change the ownership of land function call
        changeOwnership(r.propertyId, r.buyer);
    }

    function registrarRejection (uint _requestId) public {
        purchaseRequest storage r = requests[_requestId];
        // Check whether msg.sender is the land registrar
        // require(msg.sender==r.owner, "You are not the owner of the land requested");
        r.rejected = true;
        r.successful = false;
        //send notification to Requester
    }
    
}