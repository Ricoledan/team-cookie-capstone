const Identity = artifacts.require('Identity');

contract('Identity', (accounts) => {
    let identityInstance;

    before(async () => {
        identityInstance = await Identity.deployed();
    });

    it('should create a new identity', async () => {
        const din = '123456789';
        const ssn = '123-45-6789';
        const fullName = 'John Doe';
        const dateOfBirth = 19900101;
        const residentialAddress = '123 Main St';

        await identityInstance.createIdentity(din, ssn, fullName, dateOfBirth, residentialAddress);

        const citizen = await identityInstance.citizens(din);
        assert.equal(citizen.din, din);
        assert.equal(citizen.ssn, ssn);
        assert.equal(citizen.fullName, fullName);
        assert.equal(citizen.dateOfBirth, dateOfBirth);
        assert.equal(citizen.residentialAddress, residentialAddress);
        assert.equal(citizen.exists, true);
    });

    it('should update an existing identity', async () => {
        const din = '123456789';
        const newSsn = '987-65-4321';
        const newFullName = 'Jane Smith';
        const newDateOfBirth = 19851231;
        const newResidentialAddress = '456 Elm St';

        await identityInstance.updateIdentity(din, newSsn, newFullName, newDateOfBirth, newResidentialAddress);

        const citizen = await identityInstance.citizens(din);
        assert.equal(citizen.din, din);
        assert.equal(citizen.ssn, newSsn);
        assert.equal(citizen.fullName, newFullName);
        assert.equal(citizen.dateOfBirth, newDateOfBirth);
        assert.equal(citizen.residentialAddress, newResidentialAddress);
        assert.equal(citizen.exists, true);
    });

    it('should fail to update a non-existent identity', async () => {
        const nonExistentDin = '987654321';

        try {
            await identityInstance.updateIdentity(nonExistentDin, '123-45-6789', 'John Doe', 19900101, '123 Main St');
            assert.fail('Expected revert');
        } catch (error) {
            assert(error.message.includes('Identity does not exist'));
        }
    });
});
