// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrivacyControl {
    struct PrivacySettings {
        mapping(address => bool) allowAccess; // Mapping of government agencies allowed to access specific information
        bool exists;
    }

    mapping(address => PrivacySettings) public privacySettings;

    event InformationShared(address indexed citizen, address indexed governmentAgency, string information);
    event AccessRevoked(address indexed citizen, address indexed governmentAgency);

    function shareInformation(address _governmentAgency, string memory _information) public {
        require(privacySettings[msg.sender].exists, "Citizen privacy settings do not exist");
        require(privacySettings[msg.sender].allowAccess[_governmentAgency], "Government agency not allowed access");

        emit InformationShared(msg.sender, _governmentAgency, _information);
    }

    function grantAccess(address _governmentAgency) public {
        require(privacySettings[msg.sender].exists, "Citizen privacy settings do not exist");

        privacySettings[msg.sender].allowAccess[_governmentAgency] = true;
    }

    function revokeAccess(address _governmentAgency) public {
        require(privacySettings[msg.sender].exists, "Citizen privacy settings do not exist");

        delete privacySettings[msg.sender].allowAccess[_governmentAgency];

        emit AccessRevoked(msg.sender, _governmentAgency);
    }

    function setPrivacySettings(address[] memory _governmentAgencies, bool _access) public {
        require(privacySettings[msg.sender].exists, "Citizen privacy settings do not exist");

        for (uint256 i = 0; i < _governmentAgencies.length; i++) {
            privacySettings[msg.sender].allowAccess[_governmentAgencies[i]] = _access;
        }
    }

    function createPrivacySettings() public {
        require(!privacySettings[msg.sender].exists, "Citizen privacy settings already exist");

        privacySettings[msg.sender].exists = true;
    }

    function isAccessAllowed(address citizen, address agency) public view returns (bool) {
        return privacySettings[citizen].allowAccess[agency];
    }

    function doesPrivacySettingsExist(address citizen) public view returns (bool) {
        return privacySettings[citizen].exists;
    }
}
