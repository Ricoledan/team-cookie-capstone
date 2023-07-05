const IdentityTracer = artifacts.require('IdentityTracer');

module.exports = function (deployer) {
    deployer.deploy(IdentityTracer);
};
