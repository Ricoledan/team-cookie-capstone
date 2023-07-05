// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../privacy/PrivacyControl.sol";

contract PrivacySecurity {
    struct SecuritySettings {
        mapping(string => bool) restrictedFields; // Mapping of restricted fields based on citizen preferences
    }

    mapping(address => SecuritySettings) private securitySettings;
    PrivacyControl private privacyControl;

    constructor(address _privacyControlContract) {
        privacyControl = PrivacyControl(_privacyControlContract);
    }

    function restrictField(string memory _field) public {
        require(privacyControl.doesPrivacySettingsExist(msg.sender), "Access not authorized");
        securitySettings[msg.sender].restrictedFields[_field] = true;
    }

    function unrestrictField(string memory _field) public {
        require(privacyControl.doesPrivacySettingsExist(msg.sender), "Access not authorized");
        delete securitySettings[msg.sender].restrictedFields[_field];
    }

    function isFieldRestricted(string memory _field) public view returns (bool) {
        return securitySettings[msg.sender].restrictedFields[_field];
    }
}
