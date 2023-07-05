const LicenseRegistry = artifacts.require('LicenseRegistry');

contract('LicenseRegistry', (accounts) => {
    let licenseRegistryInstance;
    const testDIN = '123456';
    const testLicenseType = 'Test License';

    before(async () => {
        licenseRegistryInstance = await LicenseRegistry.deployed();
    });

    it('should request a new license', async () => {
        await licenseRegistryInstance.requestLicense(testDIN, testLicenseType);
        const license = await licenseRegistryInstance.licenses(testDIN);
        assert.equal(license.licenseType, testLicenseType);
        assert.equal(license.din, testDIN);
        assert.equal(license.isActive, false);
    });

    // fix later
    // it('should reject the license', async () => {
    //     await licenseRegistryInstance.rejectLicense(testDIN);
    //
    //     try {
    //         const license = await licenseRegistryInstance.licenses(testDIN);
    //         assert.fail('Expected revert');
    //     } catch (error) {
    //         assert(error.message.includes('License does not exist'));
    //     }
    // });

    it('should request a new license again', async () => {
        await licenseRegistryInstance.requestLicense(testDIN, testLicenseType);
        const license = await licenseRegistryInstance.licenses(testDIN);
        assert.equal(license.licenseType, testLicenseType);
        assert.equal(license.din, testDIN);
        assert.equal(license.isActive, false);
    });

    it('should approve the license', async () => {
        await licenseRegistryInstance.approveLicense(testDIN);
        const license = await licenseRegistryInstance.licenses(testDIN);
        assert.equal(license.isActive, true);
    });

    it('should renew the license with a new type', async () => {
        const newLicenseType = 'New Test License';
        await licenseRegistryInstance.renewLicense(testDIN, newLicenseType);
        const license = await licenseRegistryInstance.licenses(testDIN);
        assert.equal(license.licenseType, newLicenseType);
    });
});
