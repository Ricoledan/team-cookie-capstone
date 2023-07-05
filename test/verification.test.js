const LicenseVerifier = artifacts.require('LicenseVerifier');

contract('LicenseVerifier', (accounts) => {
    let licenseVerifierInstance;
    const testPublicKey = 'SamplePublicKey';
    const issuingAgency = accounts[1];
    const qrCodeData = 'SampleQRCodeData'; // Since your QR code scanning is not implemented, using a placeholder here

    before(async () => {
        licenseVerifierInstance = await LicenseVerifier.deployed();
    });

    it('should issue a new license', async () => {
        await licenseVerifierInstance.issueLicense(testPublicKey, issuingAgency);
        const license = await licenseVerifierInstance.licenses(testPublicKey);
        assert.equal(license.publicKey, testPublicKey);
        assert.equal(license.issuingAgency, issuingAgency);
        assert.equal(license.exists, true);
    });

    it('should extract public key from qr code', async () => {
        const extractedPublicKey = await licenseVerifierInstance.scanQRCode(qrCodeData);
        assert.equal(extractedPublicKey, qrCodeData);
    });

    it('should verify the issued license', async () => {
        await licenseVerifierInstance.verifyLicense(testPublicKey, issuingAgency);
        const license = await licenseVerifierInstance.licenses(testPublicKey);
        assert.equal(license.exists, true);
    });

    it('should return the correct issuing agency', async () => {
        const returnedIssuingAgency = await licenseVerifierInstance.getIssuingAgency(testPublicKey);
        assert.equal(returnedIssuingAgency, issuingAgency);
    });

    it('should revoke the issued license', async () => {
        await licenseVerifierInstance.revokeLicense(testPublicKey);
        try {
            await licenseVerifierInstance.getIssuingAgency(testPublicKey);
            assert.fail('Expected revert');
        } catch (error) {
            assert(error.message.includes('License does not exist'));
        }
    });

    it('should fail to verify a non-existent license', async () => {
        const nonExistentPublicKey = 'NonExistentPublicKey';

        try {
            await licenseVerifierInstance.verifyLicense(nonExistentPublicKey, issuingAgency);
            assert.fail('Expected revert');
        } catch (error) {
            assert(error.message.includes('License does not exist'));
        }
    });
});
