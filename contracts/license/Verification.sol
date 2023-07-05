// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LicenseVerifier {
    struct License {
        string publicKey;
        address issuingAgency;
        bool exists;
    }

    mapping(string => License) public licenses;

    event LicenseVerified(string indexed publicKey, address indexed issuingAgency);

    function verifyLicense(string memory _publicKey, address _issuingAgency) public {
        require(licenses[_publicKey].exists, "License does not exist");

        emit LicenseVerified(_publicKey, _issuingAgency);
    }

    function scanQRCode(string memory _qrCodeData) public pure returns (string memory) {
        // Logic to scan the QR code and extract the public key
        // Here, we assume that the QR code data contains the public key associated with the license

        return extractPublicKey(_qrCodeData);
    }

    function extractPublicKey(string memory _qrCodeData) internal pure returns (string memory) {
        // Logic to extract the public key from the QR code data
        // Implement your own extraction algorithm here based on the QR code structure and format

        return _qrCodeData; // Placeholder implementation, replace with your own logic
    }

    function issueLicense(string memory _publicKey, address _issuingAgency) public {
        require(!licenses[_publicKey].exists, "License already exists");

        licenses[_publicKey] = License(_publicKey, _issuingAgency, true);
    }

    function revokeLicense(string memory _publicKey) public {
        require(licenses[_publicKey].exists, "License does not exist");

        delete licenses[_publicKey];
    }

    function getIssuingAgency(string memory _publicKey) public view returns (address) {
        require(licenses[_publicKey].exists, "License does not exist");

        return licenses[_publicKey].issuingAgency;
    }
}
