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
      PRODUCER_SAME_AS_REQUESTOR: 'Yes',
      PRODUCER: 'Test',
      PRODUCTION_TYPE_INDEX: 2,
      STORY: 'ABC News and GMA Twitter Accounts Hacked',
      SLUG: ' Test Slug',
      SHOOT_STATUS_INDEX: 0,
      TALENT: 'None on Site',
      SHOW_UNIT: 'Dateline',
      BUDGET_CODE: '1234',
      EDITREQUESTID: "ER123456789",
      UPLOAD_PATH: __dirname.replace('requests', 'templates') + '/general/' + 'test_image.jpg',
      BUREAU_LOCATION_INDEX: 1,
      ADDRESS: "123 Test Address",
      ADDRESS_NOTES: "Not a Real Address",
      CITY: "New York",
      ZIP: "12345",
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
      },
      DATE_RANGE: {
            START: 1509659446509,
            END: 1511447168556
      },
      DESCRIPTION: 'Test Description',
      SPECIAL_GEAR: 'None',
      DRONE_SHOOT: false,
      AUDIO_NEED_INDEX: 3,
      SPECIAL_CONDITIONS_INDEX: 1,
      TRANSMISSION_TYPE_INDEX: 1,
      TALENT: 'None on Site'
};

// general Class
let general = (device = 'desktop', username = null, password = null) => {
      return new Promise((resolve, reject) => {
            new crew.Client(device, username, password)

                  //Initialize
                  .pause(500)
                  .getUrl().then((url) => {
                        console.log('Created new General Client at ' + url);
                  })
                  .frame(1).then(() => {
                        console.log(`Clicked on iFrame\n\n`);
                  }).catch((e)=>console.error(`Could not click on iFrame: ${e}`))

                  // Presses button to initiate Breaking News Crew Request
                  .click('*[title="General Crew Request"]').then(() => {
                        console.log(`Clicked General.\n\n`);
                  }).catch((e)=>console.error(`Could not click General: ${e}`))
                  // Opens phone edit menu
                  .click('.button-edit-gcr=edit').then(() => {
                        console.log(`Clicked phone edit button\n\n`);
                  }).catch((e)=>console.error(`Could not click phone edit button: ${e}`))
                  .pause(250)

                  // Changes value of phone inputs
                  .setValue('*[placeholder="(XXX) XXX-XXXX"]', TEST_DATA.PHONE).then(() => {
                        console.log(`Changed phone number.\n\n`);
                  }).catch((e)=>console.error(`Could not change phone number: ${e}`))
                  .click('.button-edit-gcr=save').then(() => {
                        console.log(`Clicked phone save button\n\n`);
                  }).catch((e)=>console.error(`Could not click phone save button: ${e}`))
                  .pause(250)

                  // Sets Producer Same as Requestor
                  .selectByIndex('#isproducer', TEST_DATA.PRODUCER_SAME_AS_REQUESTOR == 'Yes' ? 1 : 2).then(() => {
                        console.log(`Selected ${TEST_DATA.PRODUCER_SAME_AS_REQUESTOR} to \"Is producer same as requestor?\"\n\n`);
                  }).catch((e)=>console.error(`Could not select ${TEST_DATA.PRODUCER_SAME_AS_REQUESTOR} to \"Is producer same as requestor?\" ${e}`))
                  .pause(250)

                  // Sets talent from dropdown
                  .click('#peoplePickerApproverDiv_TopSpan_EditorInput').then(() => {
                        console.log(`Clicked on talent\n\n`);
                  }).catch((e)=>console.error(`Could not click on talent\n\n`))
                  .setValue('#peoplePickerApproverDiv_TopSpan_EditorInput', TEST_DATA.PRODUCER.substring(0,3)).then(() => {
                        console.log(`Set talent to: ${TEST_DATA.PRODUCER}\n\n`);
                  }).catch((e)=>console.error(`Could not set talent: ${e}`))
                  .pause(10000)
                  .keys(40).then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Click Next
                  .click('*[next="What"]').then(() => {
                        console.log(`Clicked Next button to WHAT page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to WHAT page: ${e}`))

                  // WHAT

                  // Sets Production Type
                  .selectByIndex('#productiontype', TEST_DATA.PRODUCTION_TYPE_INDEX).then(() => {
                        console.log(`Set Production Type to ${TEST_DATA.PRODUCTION_TYPE_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set Production Type: ${e}`))

                  // Sets story name from dropdown to story name
                  .click('#txtStoryName').then(() => {
                        console.log(`Clicked on story\n\n`);
                  }).catch((e)=>console.error(`Could not click on story\n\n`))
                  .setValue('#txtStoryName', TEST_DATA.STORY.substring(0,3) + ' ').then(() => {
                        console.log(`Set story to: ${TEST_DATA.STORY}\n\n`);
                  }).catch((e)=>console.error(`Could not set story: ${e}`))
                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Dummy Assignment Slug
                  .addValue('#assignmentslug', ' ' + TEST_DATA.SLUG).then(() => {
                        console.log(`Set assignment slug to: ${TEST_DATA.SLUG}\n\n`);
                  }).catch((e)=>console.error(`Could not set assignment slug: ${e}`))

                  // Sets Shoot Status
                  .selectByIndex('#shootstatus', TEST_DATA.SHOOT_STATUS_INDEX).then(() => {
                        console.log(`Set Shoot Status to ${TEST_DATA.SHOOT_STATUS_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set Shoot Status: ${e}`))

                  // Sets talent from dropdown
                  .click('#talent_0').then(() => {
                        console.log(`Clicked on talent\n\n`);
                  }).catch((e)=>console.error(`Could not click on talent\n\n`))
                  .setValue('#talent_0', TEST_DATA.TALENT.substring(0,3)).then(() => {
                        console.log(`Set talent to: ${TEST_DATA.TALENT}\n\n`);
                  }).catch((e)=>console.error(`Could not set talent: ${e}`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Sets Show Unit Code
                  .click('#txtUnit_0').then(() => {
                        console.log(`Clicked on show unit\n\n`);
                  }).catch((e)=>console.error(`Could not click on show unit\n\n`))
                  .addValue('#txtUnit_0', TEST_DATA.SHOW_UNIT).then(() => {
                        console.log(`Set show unit to: ${TEST_DATA.SHOW_UNIT}\n\n`);
                  }).catch((e)=>console.error(`Could not set show unit: ${e}`))

                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Budget Code
                  .addValue('#txtBucode_0', TEST_DATA.BUDGET_CODE).then(() => {
                        console.log(`Set budget code to: ${TEST_DATA.BUDGET_CODE}\n\n`);
                  }).catch((e)=>console.error(`Could not set budget code: ${e}`))

                  // Attaches Edit Request ID
                  .setValue('#requestid', TEST_DATA.EDITREQUESTID).then(() => {
                        console.log(`Set Edit Request ID to: ${TEST_DATA.EDITREQUESTID}\n\n`);
                  }).catch((e)=>console.error(`Could not set Edit Request ID: ${e}`))

                  // Upload file
                  .chooseFile('#getFile', TEST_DATA.UPLOAD_PATH).then(() => {
                        console.log(`Uploaded file from directory: ${TEST_DATA.UPLOAD_PATH}\n\n`);
                  }).catch((e)=>console.error(`Could not upload file: ${e}`))
                  .pause(2000)
                  .click('#addFileButton').then(() => {
                        console.log(`Clicked UPLOAD\n\n`);
                  }).catch((e)=>console.error(`Could not click UPLOAD: ${e}`))

                  // Click Next
                  .click('*[next="Where"]').then(() => {
                        console.log(`Clicked Next button to WHERE page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to WHERE page: ${e}`))

                  // WHERE

                  // Sets Bureau Location
                  .pause(1000)
                  .selectByIndex('#bureaulocation', TEST_DATA.BUREAU_LOCATION_INDEX).then(() => {
                        console.log(`Selected bureau location to index ${TEST_DATA.BUREAU_LOCATION_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not select bureau location to index: ${e}`))

                  // Sets Address
                  .setValue('#address1', TEST_DATA.ADDRESS).then(() => {
                        console.log(`Set Address to: ${TEST_DATA.ADDRESS}\n\n`);
                  }).catch((e)=>console.error(`Could not set Address: ${e}`))
                  .setValue('#addressnotes', TEST_DATA.ADDRESS_NOTES).then(() => {
                        console.log(`Set Address Notes to: ${TEST_DATA.ADDRESS_NOTES}\n\n`);
                  }).catch((e)=>console.error(`Could not set Address Notes: ${e}`))
                  .setValue('#city-text', TEST_DATA.CITY).then(() => {
                        console.log(`Set City to: ${TEST_DATA.CITY}\n\n`);
                  }).catch((e)=>console.error(`Could not set City: ${e}`))
                  .setValue('#zip-text', TEST_DATA.ZIP).then(() => {
                        console.log(`Set Zip to: ${TEST_DATA.ZIP}\n\n`);
                  }).catch((e)=>console.error(`Could not set Zip: ${e}`))
                  .pause(500)

                  // Click Next
                  .click('*[next="When"]').then(() => {
                        console.log(`Clicked Next button to WHEN page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to WHEN page: ${e}`))

                  // WHEN

                  // Sets Meet Time
                  .setValue('#meettime-hr', TEST_DATA.MEET_TIME.HOUR).then(() => {
                        console.log(`Set meet hour to ${TEST_DATA.MEET_TIME.HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet hour: ${TEST_DATA.MEET_TIME.HOUR}`))
                  .setValue('#meettime-min', TEST_DATA.MEET_TIME.MINUTES).then(() => {
                        console.log(`Set meet minutes to ${TEST_DATA.MEET_TIME.MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet minutes: ${TEST_DATA.MEET_TIME.MINUTES}`))
                  .selectByValue('#meettime-select', TEST_DATA.MEET_TIME.TIME_OF_DAY).then(() => {
                        console.log(`Set meet time of day to ${TEST_DATA.MEET_TIME.TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet time of day: ${TEST_DATA.MEET_TIME.TIME_OF_DAY}`))

                  // Sets End Time
                  .setValue('#endtime-hr', TEST_DATA.END_TIME.HOUR).then(() => {
                        console.log(`Set end hour to ${TEST_DATA.END_TIME.HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end hour: ${TEST_DATA.END_TIME.HOUR}`))
                  .setValue('#endtime-min', TEST_DATA.END_TIME.MINUTES).then(() => {
                        console.log(`Set end minutes to ${TEST_DATA.END_TIME.MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end minutes: ${TEST_DATA.END_TIME.MINUTES}`))
                  .selectByValue('#endtime-select', TEST_DATA.END_TIME.TIME_OF_DAY).then(() => {
                        console.log(`Set end time of day to ${TEST_DATA.END_TIME.TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end time of day: ${TEST_DATA.END_TIME.TIME_OF_DAY}`))

                  // Sets Roll Time
                  .setValue('#rolltime-hr', TEST_DATA.ROLL_TIME.HOUR).then(() => {
                        console.log(`Set roll hour to ${TEST_DATA.ROLL_TIME.HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll hour: ${TEST_DATA.ROLL_TIME.HOUR}`))
                  .setValue('#rolltime-min', TEST_DATA.ROLL_TIME.MINUTES).then(() => {
                        console.log(`Set roll minutes to ${TEST_DATA.ROLL_TIME.MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll minutes: ${TEST_DATA.ROLL_TIME.MINUTES}`))
                  .selectByValue('#rolltime-select', TEST_DATA.ROLL_TIME.TIME_OF_DAY).then(() => {
                        console.log(`Set roll time of day to ${TEST_DATA.ROLL_TIME.TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll time of day: ${TEST_DATA.ROLL_TIME.TIME_OF_DAY}`))

                  // Sets Date Range
                  .click('.calender-conatainer').then(() => {
                        console.log(`Clicked on Calendar Container\n\n`);
                  }).catch((e)=>console.error(`Could not click on Calendar Container: ${e}`))
                  .leftClick('.calender-conatainer', 25, 25).then(() => {
                        console.log(`Clicked on Calendar Container\n\n`);
                  }).catch((e)=>console.error(`Could not click on Calendar Container: ${e}`))

                  // Sets shoot description
                  .setValue('.shoot-textbox', TEST_DATA.DESCRIPTION).then(() => {
                        console.log(`Set shoot description to: ${TEST_DATA.DESCRIPTION}\n\n`);
                  }).catch((e)=>console.error(`Could not set shoot description: ${e}`))

                  // Sets Special Gear
                  .setValue('#specialgear', TEST_DATA.SPECIAL_GEAR).then(() => {
                        console.log(`Set special gear to: ${TEST_DATA.SPECIAL_GEAR}\n\n`);
                  }).catch((e)=>console.error(`Could not set special gear: ${e}`))

                  // Sets Drone Shoot
                  .pause(1000)
                  .selectByIndex('#isdroneshoot', TEST_DATA.DRONE_SHOOT == true ? 1 : 2).then(() => {
                        console.log(`Set drone shoot to: ${TEST_DATA.DRONE_SHOOT == true ? 'Yes' : 'No'}\n\n`);
                  }).catch((e)=>console.error(`Could not set drone shoot: ${e}`))

                  // Sets Audio Needs
                  .pause(500)
                  .selectByIndex('#audioneed', TEST_DATA.AUDIO_NEED_INDEX).then(() => {
                        console.log(`Sets audio needs: ${TEST_DATA.AUDIO_NEED_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set audio needs: ${e}`))

                  // Sets Special Conditions
                  .pause(500)
                  .selectByIndex('#specialcondition', TEST_DATA.SPECIAL_CONDITIONS_INDEX).then(() => {
                        console.log(`Set special conditions to: ${TEST_DATA.SPECIAL_CONDITIONS_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set special conditions: ${e}`))

                  // Sets Transmission Type
                  .pause(500)
                  .selectByIndex('#transmissiontype', TEST_DATA.TRANSMISSION_TYPE_INDEX).then(() => {
                        console.log(`Set transmission type to: ${TEST_DATA.TRANSMISSION_TYPE_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set transmission type: ${e}`))

                  // Click Next
                  .click('*[next="Resources"]').then(() => {
                        console.log(`Clicked Next button to RESOURCES page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to RESOURCES page: ${e}`))

                  // Ends program
                  .end().then(() => {
                        console.log(`Closed General window.\n\n`);
                        resolve();
                  }).catch(() => {
                        console.log(`Could not close General window.\n\n`);
                        reject();
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
            general(device, username, password).then(() => {
                  return loopInstance(device, username, password, --count, terminate);
            }).catch(() => {
                  return loopInstance(device, username, password, --count, terminate);
            });
      } else if (terminate) return terminate();
}

module.exports = {
      general, loop
};
