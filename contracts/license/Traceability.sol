// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityTracer {
    struct Identity {
        string din; // Decentralized Identity Number
        address issuingAgency;
        bool exists;
    }

    mapping(string => Identity) public identities;

    event IdentityVerified(string indexed din, address indexed issuingAgency);

    function verifyIdentity(string memory _din, address _issuingAgency) public {
        require(identities[_din].exists, "Identity does not exist");

        emit IdentityVerified(_din, _issuingAgency);
    }

    function issueLicense(string memory _din, address _issuingAgency) public {
        require(!identities[_din].exists, "Identity already exists");

        identities[_din] = Identity(_din, _issuingAgency, true);
    }

    function revokeLicense(string memory _din) public {
        require(identities[_din].exists, "Identity does not exist");

        delete identities[_din];
    }

    function getIssuingAgency(string memory _din) public view returns (address) {
        require(identities[_din].exists, "Identity does not exist");

        return identities[_din].issuingAgency;
    }
}
