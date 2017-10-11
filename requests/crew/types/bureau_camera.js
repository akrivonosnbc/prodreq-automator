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
      PHONE: '+1 234 567-8910',
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
            .click('*[title="Bureau Camera"]')
            // Opens phone edit menu
            .click('.button-edit-bc=edit')
            // Changes value of phone inputs
            .setValue('*[placeholder="(XXX) XXX-XXXX"]', TEST_DATA.PHONE)
            // Sets story name from dropdown to story name
            .setValue('#shootdesc-bc=', TEST_DATA.DESCRIPTION)

            .setValue('#txtStoryName-bc', TEST_DATA.STORY.substring(0,3))
            .pause(500)
            .pressKeycode(13)
            .pause(500)
            // Sets Show Unit Code
            .setValue('*[txtunit-bureau_id_0=""]', TEST_DATA.SHOW_UNIT)
            .pause(500)
            // Sets Budget Code
            .setValue('#txtBucode-Bureau_0', TEST_DATA.BUDGET_CODE)
            .pause(500)
            // Sets Bureau Location
            .selectByIndex('bureaulocation-bc', 1)
            .pause(500)
            
            .setValue('#meettime-hr-bc=', '12')

            .setValue('#meettime-min-bc=', '00')

            .end();
}

module.exports = {
      bureauCamera
};
