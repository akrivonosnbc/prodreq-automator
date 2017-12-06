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
      // Meet Time
      MEET_TIME_HOUR: '12',
      MEET_TIME_MINUTES: '00',
      MEET_TIME_TIME_OF_DAY: 'AM',
      // End Time
      END_TIME_HOUR: '2',
      END_TIME_MINUTES: '00',
      END_TIME_TIME_OF_DAY: 'PM',
      // Roll Time
      ROLL_TIME_HOUR: '3',
      ROLL_TIME_MINUTES: '00',
      ROLL_TIME_TIME_OF_DAY: 'PM'
};

// BureauCamera Class
let bureauCamera = (device = 'desktop', username = null, password = null, cases = TEST_DATA) => {
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
                  .setValue('*[placeholder="(XXX) XXX-XXXX"]', cases.PHONE).then(() => {
                        console.log(`Changed phone number.\n\n`);
                  }).catch((e)=>console.error(`Could not change phone number: ${e}`))
                  .click('.button-edit-bc=save').then(() => {
                        console.log(`Clicked phone save button\n\n`);
                  }).catch((e)=>console.error(`Could not click phone save button: ${e}`))

                  // Sets story name from dropdown to story name
                  .click('#txtStoryName-bc').then(() => {
                        console.log(`Clicked on story\n\n`);
                  }).catch((e)=>console.error(`Could not click on story\n\n`))
                  .setValue('#txtStoryName-bc', cases.STORY.substring(0,3) + ' ').then(() => {
                        console.log(`Set story to: ${cases.STORY}\n\n`);
                  }).catch((e)=>console.error(`Could not set story: ${e}`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Sets Show Unit Code
                  .click('#txtUnit-Bureau_0').then(() => {
                        console.log(`Clicked on show unit\n\n`);
                  }).catch((e)=>console.error(`Could not click on show unit\n\n`))
                  .addValue('#txtUnit-Bureau_0', cases.SHOW_UNIT).then(() => {
                        console.log(`Set show unit to: ${cases.SHOW_UNIT}\n\n`);
                  }).catch((e)=>console.error(`Could not set show unit: ${e}`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Sets Bureau Location
                  .selectByIndex('#bureaulocation-bc', cases.BUREAU_LOCATION_INDEX).then(() => {
                        console.log(`Selected index ${cases.BUREAU_LOCATION_INDEX} as bureau location\n\n`);
                  }).catch((e)=>console.error(`Could not select index ${cases.BUREAU_LOCATION_INDEX} as bureau location: ${e}`))

                  // Sets Budget Code
                  .addValue('#txtBucode-Bureau_0', cases.BUDGET_CODE).then(() => {
                        console.log(`Set budget code to: ${cases.BUDGET_CODE}\n\n`);
                  }).catch((e)=>console.error(`Could not set budget code: ${e}`))
                  .pause(500)

                  // Sets Meet Time
                  .setValue('#meettime-hr-bc', cases.MEET_TIME_HOUR).then(() => {
                        console.log(`Set meet hour to ${cases.MEET_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet hour: ${cases.MEET_TIME_HOUR}`))
                  .setValue('#meettime-min-bc', cases.MEET_TIME_MINUTES).then(() => {
                        console.log(`Set meet minutes to ${cases.MEET_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet minutes: ${cases.MEET_TIME_MINUTES}`))
                  .selectByValue('#meettime-select-bc', cases.MEET_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set meet time of day to ${cases.MEET_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet time of day: ${cases.MEET_TIME_TIME_OF_DAY}`))

                  // Sets End Time
                  .setValue('#endtime-hr-bc', cases.END_TIME_HOUR).then(() => {
                        console.log(`Set end hour to ${cases.END_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end hour: ${cases.END_TIME_HOUR}`))
                  .setValue('#endtime-min-bc', cases.END_TIME_MINUTES).then(() => {
                        console.log(`Set end minutes to ${cases.END_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end minutes: ${cases.END_TIME_MINUTES}`))
                  .selectByValue('#endtime-select-bc', cases.END_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set end time of day to ${cases.END_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end time of day: ${cases.END_TIME_TIME_OF_DAY}`))

                  // Sets Roll Time
                  .setValue('#rolltime-hr-bc', cases.ROLL_TIME_HOUR).then(() => {
                        console.log(`Set roll hour to ${cases.ROLL_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll hour: ${cases.ROLL_TIME_HOUR}`))
                  .setValue('#rolltime-min-bc', cases.ROLL_TIME_MINUTES).then(() => {
                        console.log(`Set roll minutes to ${cases.ROLL_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll minutes: ${cases.ROLL_TIME_MINUTES}`))
                  .selectByValue('#rolltime-select-bc', cases.ROLL_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set roll time of day to ${cases.ROLL_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll time of day: ${cases.ROLL_TIME_TIME_OF_DAY}`))

                  // Sets shoot description
                  .click('#shootdesc-bc').then(() => {
                        console.log(`Clicked on shoot description\n\n`);
                  }).catch((e)=>console.error(`Could not click on shoot description\n\n`))
                  .setValue('#shootdesc-bc', cases.DESCRIPTION).then(() => {
                        console.log(`Set shoot description to: ${cases.DESCRIPTION}\n\n`);
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

let loop = (device, username, password, cases, count, instances) => {
      return new Promise((resolve, reject) => {
            for (var i = 0; i < instances; i++) {
                  loopInstance(device, username, password, cases, count, () => {
                        if (i == instances) return resolve();
                  });
            }
      });
}

let loopInstance = (device, username, password, cases, count, terminate = null) => {
      if (count > 0) {
            bureauCamera(device, username, password).then(() => {
                  return loopInstance(device, username, password, cases, --count, terminate);
            }).catch(() => {
                  return loopInstance(device, username, password, cases, --count, terminate);
            });
      } else if (terminate) return terminate();
}

module.exports = {
      bureauCamera, loop
};
