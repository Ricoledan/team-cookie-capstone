// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct Citizen {
        string din; // Decentralized Identity Number
        string ssn;
        string fullName;
        uint256 dateOfBirth;
        string residentialAddress;
        bool exists;
    }

    mapping(string => Citizen) public citizens;
    string[] public citizenDINs;

    event IdentityCreated(string indexed din);
    event IdentityUpdated(string indexed din);

    function createIdentity(
        string memory _din,
        string memory _ssn,
        string memory _fullName,
        uint256 _dateOfBirth,
        string memory _residentialAddress
    ) public {
        require(!citizens[_din].exists, "Identity already exists");

        Citizen storage citizen = citizens[_din];
        citizen.din = _din;
        citizen.ssn = _ssn;
        citizen.fullName = _fullName;
        citizen.dateOfBirth = _dateOfBirth;
        citizen.residentialAddress = _residentialAddress;
        citizen.exists = true;

        citizenDINs.push(_din);

        emit IdentityCreated(_din);
    }

    function updateIdentity(
        string memory _din,
        string memory _ssn,
        string memory _fullName,
        uint256 _dateOfBirth,
        string memory _residentialAddress
    ) public {
        require(citizens[_din].exists, "Identity does not exist");

        Citizen storage citizen = citizens[_din];
        citizen.ssn = _ssn;
        citizen.fullName = _fullName;
        citizen.dateOfBirth = _dateOfBirth;
        citizen.residentialAddress = _residentialAddress;

        emit IdentityUpdated(_din);
    }

    function getIdentityCount() public view returns (uint) {
        return citizenDINs.length;
    }

    function getCitizenDINs() public view returns (string[] memory) {
        return citizenDINs;
    }

    function getIdentity(string memory din) public view returns (Citizen memory) {
        return citizens[din];
    }

    function getAllIdentities() public view returns (Citizen[] memory) {
        Citizen[] memory result = new Citizen[](citizenDINs.length);

        for (uint256 i = 0; i < citizenDINs.length; i++) {
            result[i] = citizens[citizenDINs[i]];
        }

        return result;
    }
}
