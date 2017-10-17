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
const TEST_DATA = {
      PHONE: '(234) 567-8910',
      STORY: 'ABC News and GMA Twitter Accounts Hacked',
      SHOW_UNIT: 'Dateline',
      BUDGET_CODE: '1234',
      BUREAU_LOCATION: 'NEW YORK BUREAU',
      DESCRIPTION: 'Test Description'
}

// BureauCamera Class
let bureauCamera = (username = null, password = null) => {
      return new Promise((resolve, reject) => {
            new crew.Client(username, password)

                  //Initialize
                  .getUrl().then((url) => {
                        console.log('Created new Bureau Camera Client at ' + url);
                  })
                  .pause(10000)

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
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Show Unit Code
                  .click('#txtUnit-Bureau_0').then(() => {
                        console.log(`Clicked on show unit\n\n`);
                  }).catch((e)=>console.error(`Could not click on show unit\n\n`))
                  .addValue('#txtUnit-Bureau_0', TEST_DATA.SHOW_UNIT).then(() => {
                        console.log(`Set show unit to: ${TEST_DATA.SHOW_UNIT}\n\n`);
                  }).catch((e)=>console.error(`Could not set show unit: ${e}`))

                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Bureau Location
                  .selectByValue('#bureaulocation-bc', TEST_DATA.BUREAU_LOCATION).then(() => {
                        console.log(`Selected ${TEST_DATA.BUREAU_LOCATION} as bureau location\n\n`);
                  }).catch((e)=>console.error(`Could not select ${TEST_DATA.BUREAU_LOCATION} as bureau location: ${e}`))
                  .setValue('#meettime-hr-bc', '12').then(() => {
                        console.log(`Set meet hour to 12.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet hour: ${e}`))

                  // Sets Budget Code
                  .addValue('#txtBucode-Bureau_0', TEST_DATA.BUDGET_CODE).then(() => {
                        console.log(`Set budget code to: ${TEST_DATA.BUDGET_CODE}\n\n`);
                  }).catch((e)=>console.error(`Could not set budget code: ${e}`))

                  // Submit form
                  .click('*[title="bcSubmit"]').then(() => {
                        console.log(`Clicked Submit.\n\n`);
                  }).catch((e)=>console.error(`Could not click Submit: ${e}`))
                  .pause(1000)

                  .click('.button-close').then(() => {
                        console.log(`Clicked Close.\n\n`);
                  }).catch((e)=>console.error(`Could not click Close: ${e}`))
                  .pause(500)

                  // Ends program
                  // .end().then(() => {
                  //       console.log(`Closed Bureau Camera window.\n\n`);
                  //       resolve();
                  // }).catch(() => {
                  //       console.log(`Could not close Bureau Camera window.\n\n`);
                  //       reject();
                  // });
      });
}

let loop = (username, password, count = 10, instances = 1) => {
      return new Promise((resolve) => {
            for (var i = 0; i < instances; i++) {
                  loopInstance(username, password, count, () => {
                        resolve();
                  });
            }
      });
}

let loopInstance = (username, password, count, terminate = null) => {
      if (count > 0) {
            bureauCamera(username, password).then(() => {
                  loopInstance(--count);
            }).catch(() => {
                  loopInstance(--count);
            });
      } else {
            if (terminate) terminate();
      }
}

module.exports = {
      bureauCamera, loop
};
