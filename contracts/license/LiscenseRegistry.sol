// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LicenseRegistry {
    struct License {
        string licenseType;
        string din;
        bool isActive;
    }

    mapping(string => License) public licenses;

    event LicenseRequested(string indexed din, string licenseType);
    event LicenseRenewed(string indexed din, string licenseType);
    event LicenseApproved(string indexed din, string licenseType);
    event LicenseRejected(string indexed din, string licenseType);

    function requestLicense(string memory _din, string memory _licenseType) public {
        require(!licenses[_din].isActive, "License already active");

        licenses[_din] = License(_licenseType, _din, false);

        emit LicenseRequested(_din, _licenseType);
    }

    function renewLicense(string memory _din, string memory _licenseType) public {
        require(licenses[_din].isActive, "License not active");

        licenses[_din].licenseType = _licenseType;

        emit LicenseRenewed(_din, _licenseType);
    }

    function approveLicense(string memory _din) public {
        require(licenses[_din].isActive == false, "License already active");

        licenses[_din].isActive = true;

        emit LicenseApproved(_din, licenses[_din].licenseType);
    }

    function rejectLicense(string memory _din) public {
        require(licenses[_din].isActive == false, "License already active");

        delete licenses[_din];

        emit LicenseRejected(_din, licenses[_din].licenseType);
    }
}
