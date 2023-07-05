const PrivacyControl = artifacts.require('PrivacyControl');

module.exports = function (deployer) {
    deployer.deploy(PrivacyControl);
};
