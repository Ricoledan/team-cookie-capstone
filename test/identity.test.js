const Identity = artifacts.require('Identity');

contract('Identity', (accounts) => {
    let identityInstance;

    before(async () => {
        identityInstance = await Identity.deployed();
    });

    it('should return all identities', async () => {
        const din1 = '123456789';
        const ssn1 = '123-45-6789';
        const fullName1 = 'John Doe';
        const dateOfBirth1 = 19900101;
        const residentialAddress1 = '123 Main St';

        await identityInstance.createIdentity(din1, ssn1, fullName1, dateOfBirth1, residentialAddress1);

        const din2 = '987654321';
        const ssn2 = '987-65-4321';
        const fullName2 = 'Jane Smith';
        const dateOfBirth2 = 19851231;
        const residentialAddress2 = '456 Elm St';

        await identityInstance.createIdentity(din2, ssn2, fullName2, dateOfBirth2, residentialAddress2);

        const identities = await identityInstance.getAllIdentities();

        assert.equal(identities.length, 2);

        assert.equal(identities[0].din, din1);
        assert.equal(identities[0].ssn, ssn1);
        assert.equal(identities[0].fullName, fullName1);
        assert.equal(identities[0].dateOfBirth, dateOfBirth1);
        assert.equal(identities[0].residentialAddress, residentialAddress1);
        assert.equal(identities[0].exists, true);

        assert.equal(identities[1].din, din2);
        assert.equal(identities[1].ssn, ssn2);
        assert.equal(identities[1].fullName, fullName2);
        assert.equal(identities[1].dateOfBirth, dateOfBirth2);
        assert.equal(identities[1].residentialAddress, residentialAddress2);
        assert.equal(identities[1].exists, true);
    });
});
