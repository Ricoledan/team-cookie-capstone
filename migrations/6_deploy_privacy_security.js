const PrivacySecurity = artifacts.require('PrivacySecurity');
const PrivacyControl = artifacts.require('PrivacyControl');

module.exports = function (deployer) {
    deployer.deploy(PrivacyControl)
        .then(() => {
            return deployer.deploy(PrivacySecurity, PrivacyControl.address);
        });
};
