const LicenseVerifier = artifacts.require('LicenseVerifier');

module.exports = function (deployer) {
    deployer.deploy(LicenseVerifier);
};
