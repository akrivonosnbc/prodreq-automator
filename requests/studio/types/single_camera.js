/*
      Anthony Krivonos
      Producer Request Automator
      11/07/2017
      /studio/types/single_camera.js
*/

// Imports
const studio = require('../studio.js');
const webdriverio = require('webdriverio');

// Config
const TEST_DATA = {
      PHONE: '123-456-7890',
      CC: 'Test CC',
      DIVISION_INDEX: 1,
      // Set OTHER to '' if NAME is found
      SHOW_PROJECT_NAME: 'OTHER',
      SHOW_PROJECT_OTHER: 'Test Other',
      BUDGET_CODE: '12345',
      // Preparation Start Time
      PREPARATION_START_TIME_HOUR: '12',
      PREPARATION_START_TIME_MINUTES: '00',
      PREPARATION_START_TIME_TIME_OF_DAY: 'AM',
      // Start Time
      START_TIME_HOUR: '2',
      START_TIME_MINUTES: '00',
      START_TIME_TIME_OF_DAY: 'PM',
      // End Time
      END_TIME_HOUR: '11',
      END_TIME_MINUTES: '00',
      END_TIME_TIME_OF_DAY: 'AM',
      // Set Location 1
      SET_LOCATION_1: 'rCentre',
      SET_OPTION_1: 3,
      // Set Location 2
      SET_LOCATION_2: 'field',
      SET_OPTION_2: '123 Address St.',
      // Set Location 3
      SET_LOCATION_3: 'noLoc',
      SET_OPTION_3: ''
};

// SingleCamera Class
let singleCamera = (device = 'desktop', username = null, password = null, cases = TEST_DATA) => {
      return new Promise((resolve, reject) => {
            let studioClient = new studio.Client(device, username, password)
                  //Initialize
                  .getUrl().then((url) => {
                        console.log('Created new Single Camera Live Shot from Plaza Productions Client at ' + url);
                  }).catch(()=>console.log('Could not create new Single Camera Live Shot from Plaza Productions Client'))
                  .frame(1).then(() => {
                        console.log(`Clicked on iFrame\n\n`);
                  }).catch((e)=>console.error(`Could not click on iFrame: ${e}`))

                  // Presses button to initiate Single Camera Live Shot from Plaza Productions Studio Request
                  .click('*[title="Plaza Production Live Shot"]').then(() => {
                        console.log(`Clicked Single Camera Live Shot from Plaza Productions.\n\n`);
                  }).catch((e)=>console.error(`Could not click Single Camera Live Shot from Plaza Productions: ${e}`))

                  // Opens phone edit menu
                  .click('.button-edit-gcr=edit').then(() => {
                        console.log(`Clicked cell phone edit button\n\n`);
                  }).catch((e)=>console.error(`Could not click cell phone edit button: ${e}`))
                  .pause(250)

                  // Changes value of phone inputs
                  .setValue('*[placeholder="(XXX) XXX-XXXX"]', cases.PHONE).then(() => {
                        console.log(`Changed cell phone number.\n\n`);
                  }).catch((e)=>console.error(`Could not change cell phone number: ${e}`))
                  .click('.button-edit-gcr=save').then(() => {
                        console.log(`Clicked cell phone save button\n\n`);
                  }).catch((e)=>console.error(`Could not click cell phone save button: ${e}`))
                  .pause(250)

                  // Sets CC mail value
                  .setValue('#ccmail', cases.CC).then(() => {
                        console.log(`Set CC mail to: ${cases.CC}\n\n`);
                  }).catch((e)=>console.error(`Could not set CC mail: ${e}`))

                  // Sets start date as today's date
                  .click('#studiorequest_startdate').then(() => {
                        console.log(`Clicked on calendar button\n\n`);
                  }).catch((e)=>console.error(`Could not click on calendar button: ${e}`))
                  .pause(250)
                  .click('.real-today').then(() => {
                        console.log(`Clicked on today's date\n\n`);
                  }).catch((e)=>console.error(`Could not click on today's date: ${e}`))

                  // Selects division
                  .selectByIndex('#division', cases.DIVISION_INDEX).then(() => {
                        console.log(`Selected division to index ${cases.DIVISION_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not select division to index: ${e}`))

                  // Sets Show or Project Name
                  .setValue('#txtUnit-bns_0', cases.SHOW_PROJECT_NAME).then(() => {
                        console.log(`Set project name to: ${cases.SHOW_PROJECT_NAME}\n\n`);
                  }).catch((e)=>console.error(`Could not set project name: ${e}`))
                  .pause(250)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .setValue('#otherdiv', cases.SHOW_PROJECT_OTHER).then(() => {
                        console.log(`Set project other to: ${cases.SHOW_PROJECT_OTHER}\n\n`);
                  })

                  // Sets Budget Code
                  .addValue('#txtbnscode_0', cases.BUDGET_CODE).then(() => {
                        console.log(`Set budget code to: ${cases.BUDGET_CODE}\n\n`);
                  }).catch((e)=>console.error(`Could not set budget code: ${e}`))

                  // Sets Preparation Start Time
                  .setValue('#preptime-hr', cases.PREPARATION_START_TIME_HOUR).then(() => {
                        console.log(`Set preparation start hour to ${cases.PREPARATION_START_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set preparation start hour: ${cases.PREPARATION_START_TIME_HOUR}`))
                  .setValue('#preptime-min', cases.PREPARATION_START_TIME_MINUTES).then(() => {
                        console.log(`Set preparation start minutes to ${cases.PREPARATION_START_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set preparation start minutes: ${cases.PREPARATION_START_TIME_MINUTES}`))
                  .selectByValue('#preptime-select', cases.PREPARATION_START_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set preparation start time of day to ${cases.PREPARATION_START_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set preparation start time of day: ${cases.PREPARATION_START_TIME_TIME_OF_DAY}`))

                  // Sets Start Time
                  .setValue('#prodtime-hr', cases.START_TIME_HOUR).then(() => {
                        console.log(`Set start hour to ${cases.START_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set start hour: ${cases.PREPARATION_START_TIME_HOUR}`))
                  .setValue('#prodtime-min', cases.START_TIME_MINUTES).then(() => {
                        console.log(`Set start minutes to ${cases.START_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set start minutes: ${cases.START_TIME_MINUTES}`))
                  .selectByValue('#prodtime-select', cases.START_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set start time of day to ${cases.START_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set start time of day: ${cases.START_TIME_TIME_OF_DAY}`))

                  // Sets End Time
                  .setValue('#endtime-hr', cases.END_TIME_HOUR).then(() => {
                        console.log(`Set end hour to ${cases.END_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end hour: ${cases.END_TIME_HOUR}`))
                  .setValue('#endtime-min', cases.END_TIME_MINUTES).then(() => {
                        console.log(`Set end minutes to ${cases.END_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end minutes: ${cases.END_TIME_MINUTES}`))
                  .selectByValue('#endtime-select', cases.END_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set end time of day to ${cases.END_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end time of day: ${cases.END_TIME_TIME_OF_DAY}`))

                  // Click Next
                  .click('*[next="Location"]').then(() => {
                        console.log(`Clicked Next button to SET LOCATION CREW page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to SET LOCATION CREW page: ${e}`))

                  // Set Location 1
                  .click(`#${cases.SET_LOCATION_1}`).then(() => {
                        console.log(`Location 1 set to ${cases.SET_LOCATION_1}\n\n`);
                        if (cases.SET_LOCATION_1 == 'rCentre') {
                              // Selects Rock Center Set Location
                              studioClient.selectByIndex('#chooseSetlocation_0', cases.SET_OPTION_1).then(() => {
                                    console.log(`Selected set location to ${cases.SET_OPTION_1}\n\n`);
                              }).catch((e)=>console.error(`Could not select set location: ${e}`));
                        } else if (cases.cases.SET_LOCATION_1 == 'field') {
                              studioClient.setValue('.text-box=', cases.SET_OPTION_1).then(() => {
                                    console.log(`Set address to ${cases.SET_OPTION_1}.\n\n`);
                              }).catch((e)=>console.error(`Could not set address: ${cases.SET_OPTION_1}`))
                        }
                        if (cases.SET_LOCATION_2 != "") studioClient.click(`#addSetLocation`);
                  }).catch((e)=>console.error(`Could not set Location 1: ${e}`))

                  .waitForExist(`#${cases.SET_LOCATION_2}_1`, 2000)

                  // Set Location 2
                  .click(`#${cases.SET_LOCATION_2}`).then(() => {
                        console.log(`Location 1 set to ${cases.SET_LOCATION_2}\n\n`);
                        if (cases.SET_LOCATION_2 == 'rCentre') {
                              // Selects Rock Center Set Location
                              studioClient.selectByIndex('#chooseSetlocation_0', cases.SET_OPTION_2).then(() => {
                                    console.log(`Selected set location to ${cases.SET_OPTION_2}\n\n`);
                              }).catch((e)=>console.error(`Could not select set location: ${e}`));
                        } else if (cases.cases.SET_LOCATION_2 == 'field') {
                              studioClient.setValue('.text-box=', cases.SET_OPTION_2).then(() => {
                                    console.log(`Set address to ${cases.SET_OPTION_2}.\n\n`);
                              }).catch((e)=>console.error(`Could not set address: ${cases.SET_OPTION_2}`))
                        }
                        if (cases.SET_LOCATION_3 != "") studioClient.click(`#addSetLocation`);
                  }).catch((e)=>console.error(`Could not set Location 2: ${e}`))

                  .waitForExist(`#${cases.SET_LOCATION_3}_2`, 2000)

                  // Set Location 3
                  .click(`#${cases.SET_LOCATION_3}`).then(() => {
                        console.log(`Location 1 set to ${cases.SET_LOCATION_3}\n\n`);
                        if (cases.SET_LOCATION_3 == 'rCentre') {
                              // Selects Rock Center Set Location
                              studioClient.selectByIndex('#chooseSetlocation_0', cases.SET_OPTION_3).then(() => {
                                    console.log(`Selected set location to ${cases.SET_OPTION_3}\n\n`);
                              }).catch((e)=>console.error(`Could not select set location: ${e}`));
                        } else if (cases.cases.SET_LOCATION_3 == 'field') {
                              studioClient.setValue('.text-box=', cases.SET_OPTION_3).then(() => {
                                    console.log(`Set address to ${cases.SET_OPTION_3}.\n\n`);
                              }).catch((e)=>console.error(`Could not set address: ${cases.SET_OPTION_3}`))
                        }
                  }).catch((e)=>console.error(`Could not set Location 3: ${e}`))

                  // Ends program
                  // .end().then(() => {
                  //       console.log(`Closed General window.\n\n`);
                  //       resolve();
                  // }).catch(() => {
                  //       console.log(`Could not close General window.\n\n`);
                  //       reject();
                  // });
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
            singleCamera(device, username, password, cases).then(() => {
                  return loopInstance(device, username, password, cases, --count, terminate);
            }).catch(() => {
                  return loopInstance(device, username, password, cases, --count, terminate);
            });
      } else if (terminate) return terminate();
}

module.exports = {
      singleCamera, loop
};
