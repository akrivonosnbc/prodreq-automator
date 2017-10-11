/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /crew/crew.js
*/

// Imports
const crew = require('../crew.js');
const webdriverio = require('webdriverio');

// Config
const OPTIONS = { desiredCapabilities: { browserName: 'firefox' } };

const TEST_DATA = {
      PHONE: '(234) 567-8910',
      STORY: 'ABC News and GMA Twitter Accounts Hacked',
      SHOW_UNIT: 'Dateline',
      BUDGET_CODE: '1234',
      DESCRIPTION: 'Test Description'
}

// Crew Class
let bureauCamera = (username = null, password = null) => {

      // Initiates a chain of events to fill a Bureau Camera Crew
      // request in test mode.
      new crew.Client(username, password)
            .getUrl().then((url) => {
                  console.log('Created new Bureau Camera Client at ' + url);
            })

            // Presses button to initiate Bureau Camera Crew Request
            .click('*[title="Bureau Camera"]').then(() => {
                  console.log(`Clicked Bureau Camera.\n\n`);
            }).catch((e)=>console.error(`Could not click Bureau Camera: ${e}`))
            // Opens phone edit menu
            .click('.button-edit-bc=edit').then(() => {
                  console.log(`Clicked phone edit button\n\n`);
            }).catch((e)=>console.error(`Could not click phone edit button: ${e}`))

            // Changes value of phone inputs
            .setValue('*[placeholder="(XXX) XXX-XXXX"]', TEST_DATA.PHONE).then(() => {
                  console.log(`Changed phone number.\n\n`);
            }).catch((e)=>console.error(`Could not change phone number: ${e}`))
            .click('.button-edit-bc=save').then(() => {
                  console.log(`Clicked phone save button\n\n`);
            }).catch((e)=>console.error(`Could not click phone save button: ${e}`))

            // Sets story name from dropdown to story name
            .setValue('#shootdesc-bc=', TEST_DATA.DESCRIPTION).then(() => {
                  console.log(`Set shoot description to: ${TEST_DATA.DESCRIPTION}\n\n`);
            }).catch((e)=>console.error(`Could not set shoot description: ${e}`))

            .click('#txtStoryName-bc').then(() => {
                  console.log(`Clicked on story\n\n`);
            }).catch((e)=>console.error(`Could not click on story\n\n`))

            .setValue('#txtStoryName-bc', TEST_DATA.STORY.substring(0,3) + ' ').then(() => {
                  console.log(`Set story to: ${TEST_DATA.STORY}\n\n`);
            }).catch((e)=>console.error(`Could not set story: ${e}`))

            .pause(1000)
            .pressKeycode(13).then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))

            // Sets Show Unit Code
            .click('#txtUnit-Bureau_0').then(() => {
                  console.log(`Clicked on show unit\n\n`);
            }).catch((e)=>console.error(`Could not click on show unit\n\n`))

            .setValue('#txtUnit-Bureau_0', TEST_DATA.SHOW_UNIT).then(() => {
                  console.log(`Set show unit to: ${TEST_DATA.SHOW_UNIT}\n\n`);
            }).catch((e)=>console.error(`Could not set show unit: ${e}`))

            .pause(1000)
            .pressKeycode(13).then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))

            .click('#txtBucode-Bureau_0').then(() => {
                  console.log(`Clicked on budget code\n\n`);
            }).catch((e)=>console.error(`Could not click on budget\n\n`))

            // Sets Budget Code
            .setValue('#txtBucode-Bureau_0', TEST_DATA.BUDGET_CODE).then(() => {
                  console.log(`Set budget code to: ${TEST_DATA.BUDGET_CODE}\n\n`);
            }).catch((e)=>console.error(`Could not set budget code: ${e}`))

            // Sets Bureau Location
            .selectByIndex('#bureaulocation-bc', 1).then(() => {
                  console.log(`Selected first bureau location\n\n`);
            }).catch((e)=>console.error(`Could not select bureau location: ${e}`))

            .setValue('#meettime-hr-bc', '12').then(() => {
                  console.log(`Set meet hour to 12.\n\n`);
            }).catch((e)=>console.error(`Could not set meet hour: ${e}`))

            .click('*[title="bcSubmit"]').then(() => {
                  console.log(`Clicked Bureau Camera.\n\n`);
            }).catch((e)=>console.error(`Could not click Bureau Camera: ${e}`))

            //.end();
}

module.exports = {
      bureauCamera
};
