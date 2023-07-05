const PrivacySecurity = artifacts.require('PrivacySecurity');
const PrivacyControl = artifacts.require('PrivacyControl');

contract('PrivacySecurity', (accounts) => {
    let privacyControlInstance;
    let privacySecurityInstance;

    before(async () => {
        privacyControlInstance = await PrivacyControl.deployed();
        privacySecurityInstance = await PrivacySecurity.new(privacyControlInstance.address);
    });

    it('should restrict a field', async () => {
        const citizen = accounts[0];
        const field = 'ssn';

        await privacyControlInstance.createPrivacySettings({from: citizen});
        await privacySecurityInstance.restrictField(field, {from: citizen});

        const isRestricted = await privacySecurityInstance.isFieldRestricted(field, {from: citizen});
        assert.equal(isRestricted, true);
    });

    it('should unrestrict a field', async () => {
        const citizen = accounts[0];
        const field = 'ssn';

        await privacySecurityInstance.unrestrictField(field, {from: citizen});

        const isRestricted = await privacySecurityInstance.isFieldRestricted(field, {from: citizen});
        assert.equal(isRestricted, false);
    });
});
