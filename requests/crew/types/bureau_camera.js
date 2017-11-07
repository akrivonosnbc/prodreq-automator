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
      BUREAU_LOCATION_INDEX: 1,
      DESCRIPTION: 'Test Description',
      MEET_TIME: {
            HOUR: '12',
            MINUTES: '00',
            TIME_OF_DAY: 'AM',
      },
      END_TIME: {
            HOUR: '2',
            MINUTES: '00',
            TIME_OF_DAY: 'PM',
      },
      ROLL_TIME: {
            HOUR: '3',
            MINUTES: '00',
            TIME_OF_DAY: 'PM',
      }
};

// BureauCamera Class
let bureauCamera = (device = 'desktop', username = null, password = null) => {
      return new Promise((resolve, reject) => {
            new crew.Client(device, username, password)
                  //Initialize
                  .pause(500)
                  .getUrl().then((url) => {
                        console.log('Created new Bureau Camera Client at ' + url);
                  })
                  .frame(1).then(() => {
                        console.log(`Clicked on iFrame\n\n`);
                  }).catch((e)=>console.error(`Could not click on iFrame: ${e}`))

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
                  .click('#txtStoryName-bc').then(() => {
                        console.log(`Clicked on story\n\n`);
                  }).catch((e)=>console.error(`Could not click on story\n\n`))
                  .setValue('#txtStoryName-bc', TEST_DATA.STORY.substring(0,3) + ' ').then(() => {
                        console.log(`Set story to: ${TEST_DATA.STORY}\n\n`);
                  }).catch((e)=>console.error(`Could not set story: ${e}`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Sets Show Unit Code
                  .click('#txtUnit-Bureau_0').then(() => {
                        console.log(`Clicked on show unit\n\n`);
                  }).catch((e)=>console.error(`Could not click on show unit\n\n`))
                  .addValue('#txtUnit-Bureau_0', TEST_DATA.SHOW_UNIT).then(() => {
                        console.log(`Set show unit to: ${TEST_DATA.SHOW_UNIT}\n\n`);
                  }).catch((e)=>console.error(`Could not set show unit: ${e}`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Sets Bureau Location
                  .selectByIndex('#bureaulocation-bc', TEST_DATA.BUREAU_LOCATION_INDEX).then(() => {
                        console.log(`Selected index ${TEST_DATA.BUREAU_LOCATION_INDEX} as bureau location\n\n`);
                  }).catch((e)=>console.error(`Could not select index ${TEST_DATA.BUREAU_LOCATION_INDEX} as bureau location: ${e}`))

                  // Sets Budget Code
                  .addValue('#txtBucode-Bureau_0', TEST_DATA.BUDGET_CODE).then(() => {
                        console.log(`Set budget code to: ${TEST_DATA.BUDGET_CODE}\n\n`);
                  }).catch((e)=>console.error(`Could not set budget code: ${e}`))
                  .pause(500)

                  // Sets Meet Time
                  .setValue('#meettime-hr-bc', TEST_DATA.MEET_TIME.HOUR).then(() => {
                        console.log(`Set meet hour to ${TEST_DATA.MEET_TIME.HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet hour: ${TEST_DATA.MEET_TIME.HOUR}`))
                  .setValue('#meettime-min-bc', TEST_DATA.MEET_TIME.MINUTES).then(() => {
                        console.log(`Set meet minutes to ${TEST_DATA.MEET_TIME.MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet minutes: ${TEST_DATA.MEET_TIME.MINUTES}`))
                  .selectByValue('#meettime-select-bc', TEST_DATA.MEET_TIME.TIME_OF_DAY).then(() => {
                        console.log(`Set meet time of day to ${TEST_DATA.MEET_TIME.TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet time of day: ${TEST_DATA.MEET_TIME.TIME_OF_DAY}`))

                  // Sets End Time
                  .setValue('#endtime-hr-bc', TEST_DATA.END_TIME.HOUR).then(() => {
                        console.log(`Set end hour to ${TEST_DATA.END_TIME.HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end hour: ${TEST_DATA.END_TIME.HOUR}`))
                  .setValue('#endtime-min-bc', TEST_DATA.END_TIME.MINUTES).then(() => {
                        console.log(`Set end minutes to ${TEST_DATA.END_TIME.MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end minutes: ${TEST_DATA.END_TIME.MINUTES}`))
                  .selectByValue('#endtime-select-bc', TEST_DATA.END_TIME.TIME_OF_DAY).then(() => {
                        console.log(`Set end time of day to ${TEST_DATA.END_TIME.TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end time of day: ${TEST_DATA.END_TIME.TIME_OF_DAY}`))

                  // Sets Roll Time
                  .setValue('#rolltime-hr-bc', TEST_DATA.ROLL_TIME.HOUR).then(() => {
                        console.log(`Set roll hour to ${TEST_DATA.ROLL_TIME.HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll hour: ${TEST_DATA.ROLL_TIME.HOUR}`))
                  .setValue('#rolltime-min-bc', TEST_DATA.ROLL_TIME.MINUTES).then(() => {
                        console.log(`Set roll minutes to ${TEST_DATA.ROLL_TIME.MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll minutes: ${TEST_DATA.ROLL_TIME.MINUTES}`))
                  .selectByValue('#rolltime-select-bc', TEST_DATA.ROLL_TIME.TIME_OF_DAY).then(() => {
                        console.log(`Set roll time of day to ${TEST_DATA.ROLL_TIME.TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll time of day: ${TEST_DATA.ROLL_TIME.TIME_OF_DAY}`))

                  // Sets shoot description
                  .click('#shootdesc-bc').then(() => {
                        console.log(`Clicked on shoot description\n\n`);
                  }).catch((e)=>console.error(`Could not click on shoot description\n\n`))
                  .setValue('#shootdesc-bc', TEST_DATA.DESCRIPTION).then(() => {
                        console.log(`Set shoot description to: ${TEST_DATA.DESCRIPTION}\n\n`);
                  }).catch((e)=>console.error(`Could not set shoot description: ${e}`))

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
                  .end().then(() => {
                        console.log(`Closed Bureau Camera window.\n\n`);
                        return resolve();
                  }).catch(() => {
                        console.log(`Could not close Bureau Camera window.\n\n`);
                        return reject();
                  });
      });
}

let loop = (device, username, password, count, instances) => {
      return new Promise((resolve, reject) => {
            for (var i = 0; i < instances; i++) {
                  loopInstance(device, username, password, count, () => {
                        if (i == instances) return resolve();
                  });
            }
      });
}

let loopInstance = (device, username, password, count, terminate = null) => {
      if (count > 0) {
            bureauCamera(device, username, password).then(() => {
                  return loopInstance(device, username, password, --count, terminate);
            }).catch(() => {
                  return loopInstance(device, username, password, --count, terminate);
            });
      } else if (terminate) return terminate();
}

module.exports = {
      bureauCamera, loop
};
