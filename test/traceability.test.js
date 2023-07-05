const IdentityTracer = artifacts.require('IdentityTracer');

contract('IdentityTracer', (accounts) => {
    let identityTracerInstance;
    const testDIN = '123456';
    const issuingAgency = accounts[1];

    before(async () => {
        identityTracerInstance = await IdentityTracer.deployed();
    });

    it('should issue a new identity', async () => {
        await identityTracerInstance.issueLicense(testDIN, issuingAgency);
        const identity = await identityTracerInstance.identities(testDIN);
        assert.equal(identity.din, testDIN);
        assert.equal(identity.issuingAgency, issuingAgency);
        assert.equal(identity.exists, true);
    });

    it('should verify the issued identity', async () => {
        await identityTracerInstance.verifyIdentity(testDIN, issuingAgency);
        const identity = await identityTracerInstance.identities(testDIN);
        assert.equal(identity.exists, true);
    });

    it('should return the correct issuing agency', async () => {
        const returnedIssuingAgency = await identityTracerInstance.getIssuingAgency(testDIN);
        assert.equal(returnedIssuingAgency, issuingAgency);
    });

    it('should revoke the issued identity', async () => {
        await identityTracerInstance.revokeLicense(testDIN);
        try {
            await identityTracerInstance.getIssuingAgency(testDIN);
            assert.fail('Expected revert');
        } catch (error) {
            assert(error.message.includes('Identity does not exist'));
        }
    });

    it('should fail to verify a non-existent identity', async () => {
        const nonExistentDIN = '987654321';

        try {
            await identityTracerInstance.verifyIdentity(nonExistentDIN, issuingAgency);
            assert.fail('Expected revert');
        } catch (error) {
            assert(error.message.includes('Identity does not exist'));
        }
    });
});
