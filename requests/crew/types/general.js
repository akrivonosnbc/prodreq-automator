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
      ROLL_TIME_TIME_OF_DAY: 'PM',
      DESCRIPTION: 'Test Description',
      SPECIAL_GEAR: 'None',
      DRONE_SHOOT: false,
      AUDIO_NEED_INDEX: 3,
      SPECIAL_CONDITIONS_INDEX: 1,
      TRANSMISSION_TYPE_INDEX: 1,
      TALENT: 'None on Site'
};

// general Class
let general = (device = 'desktop', username = null, password = null, cases = TEST_DATA) => {
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
                  .setValue('*[placeholder="(XXX) XXX-XXXX"]', cases.PHONE).then(() => {
                        console.log(`Changed phone number.\n\n`);
                  }).catch((e)=>console.error(`Could not change phone number: ${e}`))
                  .click('.button-edit-gcr=save').then(() => {
                        console.log(`Clicked phone save button\n\n`);
                  }).catch((e)=>console.error(`Could not click phone save button: ${e}`))
                  .pause(250)

                  // Sets Producer Same as Requestor
                  .selectByIndex('#isproducer', cases.PRODUCER_SAME_AS_REQUESTOR == 'Yes' ? 1 : 2).then(() => {
                        console.log(`Selected ${cases.PRODUCER_SAME_AS_REQUESTOR} to \"Is producer same as requestor?\"\n\n`);
                  }).catch((e)=>console.error(`Could not select ${cases.PRODUCER_SAME_AS_REQUESTOR} to \"Is producer same as requestor?\" ${e}`))
                  .pause(250)

                  // Sets talent from dropdown
                  .click('#peoplePickerApproverDiv_TopSpan_EditorInput').then(() => {
                        console.log(`Clicked on talent\n\n`);
                  }).catch((e)=>console.error(`Could not click on talent\n\n`))
                  .setValue('#peoplePickerApproverDiv_TopSpan_EditorInput', cases.PRODUCER.substring(0,3)).then(() => {
                        console.log(`Set talent to: ${cases.PRODUCER}\n\n`);
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
                  .selectByIndex('#productiontype', cases.PRODUCTION_TYPE_INDEX).then(() => {
                        console.log(`Set Production Type to ${cases.PRODUCTION_TYPE_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set Production Type: ${e}`))

                  // Sets story name from dropdown to story name
                  .click('#txtStoryName').then(() => {
                        console.log(`Clicked on story\n\n`);
                  }).catch((e)=>console.error(`Could not click on story\n\n`))
                  .setValue('#txtStoryName', cases.STORY.substring(0,3) + ' ').then(() => {
                        console.log(`Set story to: ${cases.STORY}\n\n`);
                  }).catch((e)=>console.error(`Could not set story: ${e}`))
                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Dummy Assignment Slug
                  .addValue('#assignmentslug', ' ' + cases.SLUG).then(() => {
                        console.log(`Set assignment slug to: ${cases.SLUG}\n\n`);
                  }).catch((e)=>console.error(`Could not set assignment slug: ${e}`))

                  // Sets Shoot Status
                  .selectByIndex('#shootstatus', cases.SHOOT_STATUS_INDEX).then(() => {
                        console.log(`Set Shoot Status to ${cases.SHOOT_STATUS_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set Shoot Status: ${e}`))

                  // Sets talent from dropdown
                  .click('#talent_0').then(() => {
                        console.log(`Clicked on talent\n\n`);
                  }).catch((e)=>console.error(`Could not click on talent\n\n`))
                  .setValue('#talent_0', cases.TALENT.substring(0,3)).then(() => {
                        console.log(`Set talent to: ${cases.TALENT}\n\n`);
                  }).catch((e)=>console.error(`Could not set talent: ${e}`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Sets Show Unit Code
                  .click('#txtUnit_0').then(() => {
                        console.log(`Clicked on show unit\n\n`);
                  }).catch((e)=>console.error(`Could not click on show unit\n\n`))
                  .addValue('#txtUnit_0', cases.SHOW_UNIT).then(() => {
                        console.log(`Set show unit to: ${cases.SHOW_UNIT}\n\n`);
                  }).catch((e)=>console.error(`Could not set show unit: ${e}`))

                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Budget Code
                  .addValue('#txtBucode_0', cases.BUDGET_CODE).then(() => {
                        console.log(`Set budget code to: ${cases.BUDGET_CODE}\n\n`);
                  }).catch((e)=>console.error(`Could not set budget code: ${e}`))

                  // Attaches Edit Request ID
                  .setValue('#requestid', cases.EDITREQUESTID).then(() => {
                        console.log(`Set Edit Request ID to: ${cases.EDITREQUESTID}\n\n`);
                  }).catch((e)=>console.error(`Could not set Edit Request ID: ${e}`))

                  // Upload file
                  .chooseFile('#getFile', cases.UPLOAD_PATH).then(() => {
                        console.log(`Uploaded file from directory: ${cases.UPLOAD_PATH}\n\n`);
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
                  .selectByIndex('#bureaulocation', cases.BUREAU_LOCATION_INDEX).then(() => {
                        console.log(`Selected bureau location to index ${cases.BUREAU_LOCATION_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not select bureau location to index: ${e}`))

                  // Sets Address
                  .setValue('#address1', cases.ADDRESS).then(() => {
                        console.log(`Set Address to: ${cases.ADDRESS}\n\n`);
                  }).catch((e)=>console.error(`Could not set Address: ${e}`))
                  .setValue('#addressnotes', cases.ADDRESS_NOTES).then(() => {
                        console.log(`Set Address Notes to: ${cases.ADDRESS_NOTES}\n\n`);
                  }).catch((e)=>console.error(`Could not set Address Notes: ${e}`))
                  .setValue('#city-text', cases.CITY).then(() => {
                        console.log(`Set City to: ${cases.CITY}\n\n`);
                  }).catch((e)=>console.error(`Could not set City: ${e}`))
                  .setValue('#zip-text', cases.ZIP).then(() => {
                        console.log(`Set Zip to: ${cases.ZIP}\n\n`);
                  }).catch((e)=>console.error(`Could not set Zip: ${e}`))
                  .pause(500)

                  // Click Next
                  .click('*[next="When"]').then(() => {
                        console.log(`Clicked Next button to WHEN page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to WHEN page: ${e}`))

                  // WHEN

                  // Sets Meet Time
                  .setValue('#meettime-hr', cases.MEET_TIME_HOUR).then(() => {
                        console.log(`Set meet hour to ${cases.MEET_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet hour: ${cases.MEET_TIME_HOUR}`))
                  .setValue('#meettime-min', cases.MEET_TIME_MINUTES).then(() => {
                        console.log(`Set meet minutes to ${cases.MEET_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet minutes: ${cases.MEET_TIME_MINUTES}`))
                  .selectByValue('#meettime-select', cases.MEET_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set meet time of day to ${cases.MEET_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet time of day: ${cases.MEET_TIME_TIME_OF_DAY}`))

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

                  // Sets Roll Time
                  .setValue('#rolltime-hr', cases.ROLL_TIME_HOUR).then(() => {
                        console.log(`Set roll hour to ${cases.ROLL_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll hour: ${cases.ROLL_TIME_HOUR}`))
                  .setValue('#rolltime-min', cases.ROLL_TIME_MINUTES).then(() => {
                        console.log(`Set roll minutes to ${cases.ROLL_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll minutes: ${cases.ROLL_TIME_MINUTES}`))
                  .selectByValue('#rolltime-select', cases.ROLL_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set roll time of day to ${cases.ROLL_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll time of day: ${cases.ROLL_TIME_TIME_OF_DAY}`))

                  // Sets Date Range
                  .click('.calender-conatainer').then(() => {
                        console.log(`Clicked on Calendar Container\n\n`);
                  }).catch((e)=>console.error(`Could not click on Calendar Container: ${e}`))
                  .leftClick('.calender-conatainer', 25, 25).then(() => {
                        console.log(`Clicked on Calendar Container\n\n`);
                  }).catch((e)=>console.error(`Could not click on Calendar Container: ${e}`))

                  // Sets shoot description
                  .setValue('.shoot-textbox', cases.DESCRIPTION).then(() => {
                        console.log(`Set shoot description to: ${cases.DESCRIPTION}\n\n`);
                  }).catch((e)=>console.error(`Could not set shoot description: ${e}`))

                  // Sets Special Gear
                  .setValue('#specialgear', cases.SPECIAL_GEAR).then(() => {
                        console.log(`Set special gear to: ${cases.SPECIAL_GEAR}\n\n`);
                  }).catch((e)=>console.error(`Could not set special gear: ${e}`))

                  // Sets Drone Shoot
                  .pause(1000)
                  .selectByIndex('#isdroneshoot', cases.DRONE_SHOOT == true ? 1 : 2).then(() => {
                        console.log(`Set drone shoot to: ${cases.DRONE_SHOOT == true ? 'Yes' : 'No'}\n\n`);
                  }).catch((e)=>console.error(`Could not set drone shoot: ${e}`))

                  // Sets Audio Needs
                  .pause(500)
                  .selectByIndex('#audioneed', cases.AUDIO_NEED_INDEX).then(() => {
                        console.log(`Sets audio needs: ${cases.AUDIO_NEED_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set audio needs: ${e}`))

                  // Sets Special Conditions
                  .pause(500)
                  .selectByIndex('#specialcondition', cases.SPECIAL_CONDITIONS_INDEX).then(() => {
                        console.log(`Set special conditions to: ${cases.SPECIAL_CONDITIONS_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set special conditions: ${e}`))

                  // Sets Transmission Type
                  .pause(500)
                  .selectByIndex('#transmissiontype', cases.TRANSMISSION_TYPE_INDEX).then(() => {
                        console.log(`Set transmission type to: ${cases.TRANSMISSION_TYPE_INDEX}\n\n`);
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

let loop = (device, username, password, cases, count, instances) => {
      return new Promise((resolve, reject) => {
            let passes = 0;
            for (var i = 0; i < instances; i++) {
                  loopInstance(device, username, password, cases, count, 0, (ps) => {
                        passes += ps;
                        if (i == instances) return resolve(passes);
                  });
            }
      });
}

let loopInstance = (device, username, password, cases, count, passes, terminate = null) => {
      if (count > 0) {
            cases = cases ? cases[count - cases.length] : null;
            general(device, username, password, cases).then(() => {
                  return loopInstance(device, username, password, cases, --count, ++passes, terminate);
            }).catch(() => {
                  return loopInstance(device, username, password, cases, --count, passes, terminate);
            });
      } else if (terminate) return terminate(passes);
}

module.exports = {
      general, loop
};
