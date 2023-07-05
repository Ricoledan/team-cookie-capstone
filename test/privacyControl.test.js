// const PrivacyControl = artifacts.require('PrivacyControl');
//
// contract('PrivacyControl', (accounts) => {
//     let privacyControlInstance;
//     const citizen = accounts[0];
//     const governmentAgency = accounts[1];
//
//     before(async () => {
//         privacyControlInstance = await PrivacyControl.deployed();
//     });
//
//     it('should create new privacy settings for the citizen', async () => {
//         await privacyControlInstance.createPrivacySettings({from: citizen});
//         const privacySetting = await privacyControlInstance.privacySettings(citizen);
//         assert.equal(privacySetting.exists, true);
//     });
//
//     it('should grant access to a government agency', async () => {
//         await privacyControlInstance.grantAccess(governmentAgency, {from: citizen});
//         const privacySetting = await privacyControlInstance.privacySettings(citizen);
//         assert.equal(privacySetting.allowAccess[governmentAgency], true);
//     });
//
//     it('should allow the citizen to share information with a government agency', async () => {
//         const information = "Test Information";
//         await privacyControlInstance.shareInformation(governmentAgency, information, {from: citizen});
//         const privacySetting = await privacyControlInstance.privacySettings(citizen);
//         assert.equal(privacySetting.allowAccess[governmentAgency], true);
//     });
//
//     it('should revoke access from a government agency', async () => {
//         await privacyControlInstance.revokeAccess(governmentAgency, {from: citizen});
//         const privacySetting = await privacyControlInstance.privacySettings(citizen);
//         assert.equal(privacySetting.allowAccess[governmentAgency], false);
//     });
//
//     it('should fail to share information with a government agency after access is revoked', async () => {
//         const information = "Test Information";
//         try {
//             await privacyControlInstance.shareInformation(governmentAgency, information, {from: citizen});
//             assert.fail('Expected revert');
//         } catch (error) {
//             assert(error.message.includes('Government agency not allowed access'));
//         }
//     });
//
//     it('should set privacy settings for multiple government agencies', async () => {
//         const governmentAgencies = [accounts[2], accounts[3], accounts[4]];
//         await privacyControlInstance.setPrivacySettings(governmentAgencies, true, {from: citizen});
//         for (let agency of governmentAgencies) {
//             const privacySetting = await privacyControlInstance.privacySettings(citizen);
//             assert.equal(privacySetting.allowAccess[agency], true);
//         }
//     });
// });
