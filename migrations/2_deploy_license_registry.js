const LicenseRegistry = artifacts.require('LicenseRegistry');

module.exports = function (deployer) {
    deployer.deploy(LicenseRegistry);
};
