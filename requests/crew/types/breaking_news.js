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
      STORY: 'ABC News and GMA Twitter Accounts Hacked',
      SLUG: ' Test Slug',
      SHOW_UNIT: 'Dateline',
      BUDGET_CODE: '1234',
      PEOPLE_PICKER: 'FirstName',
      PERSON_PICKED: 'TestUser2.Orlando2@nbcu.com Active Directory STG-TFAYD\\501261301',
      TALENT: 'None on Site',
      EDITREQUESTID: "ER123456789",
      BUREAU_LOCATION_INDEX: 1,
      ADDRESS: "123 Test Address",
      CITY: "New York",
      ZIP: "12345",
      ADDRESS_NOTES: "Not a Real Address",
      UPLOAD_PATH: __dirname.replace('requests', 'templates') + '/breaking_news/' + 'test_image.jpg',
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
      TRANSMISSION_TYPE_INDEX: 1,
      RESOURCE_CAMERA: 2,
      RESOURCE_AUDIO: 3
}

// BreakingNews Class
let breakingNews = (device = 'desktop', username = null, password = null, cases = TEST_DATA) => {
      return new Promise((resolve, reject) => {
            if (cases == null) cases = TEST_DATA;
            console.log(`Got cases:\n${JSON.stringify(cases, null, 2)}`);
            new crew.Client(device, username, password)
                  //Initialize
                  .pause(500)
                  .getUrl().then((url) => {
                        console.log('Created new Breaking News Client at ' + url);
                  })
                  .frame(1).then(() => {
                        console.log(`Clicked on iFrame\n\n`);
                  }).catch((e)=>console.error(`Could not click on iFrame: ${e}`))

                  // WHO

                  // Presses button to initiate Breaking News Crew Request
                  .click('*[title="Breaking News"]').then(() => {
                        console.log(`Clicked Breaking News.\n\n`);
                  }).catch((e)=>console.error(`Could not click Breaking News: ${e}`))
                  // Opens phone edit menu
                  .click('.button-edit-bn=edit').then(() => {
                        console.log(`Clicked phone edit button\n\n`);
                  }).catch((e)=>console.error(`Could not click phone edit button: ${e}`))
                  .pause(250)

                  // Changes value of phone inputs
                  .setValue('*[placeholder="(XXX) XXX-XXXX"]', cases.PHONE).then(() => {
                        console.log(`Changed phone number.\n\n`);
                  }).catch((e)=>console.error(`Could not change phone number: ${e}`))
                  .click('.button-edit-bn=save').then(() => {
                        console.log(`Clicked phone save button\n\n`);
                  }).catch((e)=>console.error(`Could not click phone save button: ${e}`))
                  .pause(250)

                  // Sets Producer Same as Requestor
                  .selectByIndex('#isproducerBN', cases.PRODUCER_SAME_AS_REQUESTOR == 'Yes' ? 1 : 2).then(() => {
                        console.log(`Selected ${cases.PRODUCER_SAME_AS_REQUESTOR} to \"Is producer same as requestor?\"\n\n`);
                  }).catch((e)=>console.error(`Could not select ${cases.PRODUCER_SAME_AS_REQUESTOR} to \"Is producer same as requestor?\" ${e}`))
                  .pause(250)

                  // Click Next
                  .click('*[next="bns-whatPage"]').then(() => {
                        console.log(`Clicked Next button to WHAT page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to WHAT page: ${e}`))

                  // WHAT

                  // Sets story name from dropdown to story name
                  .click('#txtStoryName-bns').then(() => {
                        console.log(`Clicked on story\n\n`);
                  }).catch((e)=>console.error(`Could not click on story\n\n`))
                  .setValue('#txtStoryName-bns', cases.STORY.substring(0,3) + ' ').then(() => {
                        console.log(`Set story to: ${cases.STORY}\n\n`);
                  }).catch((e)=>console.error(`Could not set story: ${e}`))
                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Dummy Assignment Slug
                  .addValue('#assignmentslug-bns', ' ' + cases.SLUG).then(() => {
                        console.log(`Set assignment slug to: ${cases.SLUG}\n\n`);
                  }).catch((e)=>console.error(`Could not set assignment slug: ${e}`))

                  // Sets talent from dropdown
                  .click('#talent_bns_0').then(() => {
                        console.log(`Clicked on talent\n\n`);
                  }).catch((e)=>console.error(`Could not click on talent\n\n`))
                  .setValue('#talent_bns_0', cases.TALENT.substring(0,3)).then(() => {
                        console.log(`Set talent to: ${cases.TALENT}\n\n`);
                  }).catch((e)=>console.error(`Could not set talent: ${e}`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Sets Show Unit Code
                  .click('#txtUnit-bns_0').then(() => {
                        console.log(`Clicked on show unit\n\n`);
                  }).catch((e)=>console.error(`Could not click on show unit\n\n`))
                  .addValue('#txtUnit-bns_0', cases.SHOW_UNIT).then(() => {
                        console.log(`Set show unit to: ${cases.SHOW_UNIT}\n\n`);
                  }).catch((e)=>console.error(`Could not set show unit: ${e}`))

                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Budget Code
                  .addValue('#txtbnscode_0', cases.BUDGET_CODE).then(() => {
                        console.log(`Set budget code to: ${cases.BUDGET_CODE}\n\n`);
                  }).catch((e)=>console.error(`Could not set budget code: ${e}`))

                  // Attaches Edit Request ID
                  .setValue('#requestid-bns', cases.EDITREQUESTID).then(() => {
                        console.log(`Set Edit Request ID to: ${cases.EDITREQUESTID}\n\n`);
                  }).catch((e)=>console.error(`Could not set Edit Request ID: ${e}`))

                  // Upload file
                  .chooseFile('#getFile-bns', cases.UPLOAD_PATH).then(() => {
                        console.log(`Uploaded file from directory: ${cases.UPLOAD_PATH}\n\n`);
                  }).catch((e)=>console.error(`Could not upload file: ${e}`))
                  .pause(2000)
                  .click('#addFileButton-bns').then(() => {
                        console.log(`Clicked UPLOAD\n\n`);
                  }).catch((e)=>console.error(`Could not click UPLOAD: ${e}`))

                  // Click Next
                  .click('*[next="bns-wherePage"]').then(() => {
                        console.log(`Clicked Next button to WHERE page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to WHERE page: ${e}`))

                  // WHERE

                  // Sets Bureau Location
                  .pause(500)
                  .selectByIndex('#bureaulocation-bns', cases.BUREAU_LOCATION_INDEX).then(() => {
                        console.log(`Selected bureau location to index ${cases.BUREAU_LOCATION_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not select bureau location to index: ${e}`))

                  // Sets Address
                  .setValue('#address-text-bns', cases.ADDRESS).then(() => {
                        console.log(`Set Address to: ${cases.ADDRESS}\n\n`);
                  }).catch((e)=>console.error(`Could not set Address: ${e}`))
                  .setValue('#address-text-bns2', cases.ADDRESS_NOTES).then(() => {
                        console.log(`Set Address Notes to: ${cases.ADDRESS_NOTES}\n\n`);
                  }).catch((e)=>console.error(`Could not set Address Notes: ${e}`))
                  .setValue('#city-text-bns', cases.CITY).then(() => {
                        console.log(`Set City to: ${cases.CITY}\n\n`);
                  }).catch((e)=>console.error(`Could not set City: ${e}`))
                  .setValue('#zip-text-bns', cases.ZIP).then(() => {
                        console.log(`Set Zip to: ${cases.ZIP}\n\n`);
                  }).catch((e)=>console.error(`Could not set Zip: ${e}`))
                  .pause(500)

                  // Click Next
                  .click('*[next="bns-whenPage"]').then(() => {
                        console.log(`Clicked Next button to WHEN page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to WHEN page: ${e}`))

                  // WHEN

                  // Sets Meet Time
                  .setValue('#meettime-hr-bns', cases.MEET_TIME_HOUR).then(() => {
                        console.log(`Set meet hour to ${cases.MEET_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet hour: ${cases.MEET_TIME_HOUR}`))
                  .setValue('#meettime-min-bns', cases.MEET_TIME_MINUTES).then(() => {
                        console.log(`Set meet minutes to ${cases.MEET_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet minutes: ${cases.MEET_TIME_MINUTES}`))
                  .selectByValue('#meettime-select-bns', cases.MEET_TIME.TIME_OF_DAY).then(() => {
                        console.log(`Set meet time of day to ${cases.MEET_TIME.TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set meet time of day: ${cases.MEET_TIME.TIME_OF_DAY}`))

                  // Sets End Time
                  .setValue('#endtime-hr-bns', cases.END_TIME.HOUR).then(() => {
                        console.log(`Set end hour to ${cases.END_TIME.HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end hour: ${cases.END_TIME.HOUR}`))
                  .setValue('#endtime-min-bns', cases.END_TIME_MINUTES).then(() => {
                        console.log(`Set end minutes to ${cases.END_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end minutes: ${cases.END_TIME_MINUTES}`))
                  .selectByValue('#endtime-select-bns', cases.END_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set end time of day to ${cases.END_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set end time of day: ${cases.END_TIME_TIME_OF_DAY}`))

                  // Sets Roll Time
                  .setValue('#rolltime-hr-bns', cases.ROLL_TIME_HOUR).then(() => {
                        console.log(`Set roll hour to ${cases.ROLL_TIME_HOUR}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll hour: ${cases.ROLL_TIME_HOUR}`))
                  .setValue('#rolltime-min-bns', cases.ROLL_TIME_MINUTES).then(() => {
                        console.log(`Set roll minutes to ${cases.ROLL_TIME_MINUTES}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll minutes: ${cases.ROLL_TIME_MINUTES}`))
                  .selectByValue('#rolltime-select-bns', cases.ROLL_TIME_TIME_OF_DAY).then(() => {
                        console.log(`Set roll time of day to ${cases.ROLL_TIME_TIME_OF_DAY}.\n\n`);
                  }).catch((e)=>console.error(`Could not set roll time of day: ${cases.ROLL_TIME_TIME_OF_DAY}`))

                  // Sets shoot description
                  .setValue('#shootdesc-bns', cases.DESCRIPTION).then(() => {
                        console.log(`Set shoot description to: ${cases.DESCRIPTION}\n\n`);
                  }).catch((e)=>console.error(`Could not set shoot description: ${e}`))

                  // Sets Special Gear
                  .setValue('#specialgear-bns', cases.SPECIAL_GEAR).then(() => {
                        console.log(`Set special gear to: ${cases.SPECIAL_GEAR}\n\n`);
                  }).catch((e)=>console.error(`Could not set special gear: ${e}`))

                  // Sets Drone Shoot
                  .pause(1000)
                  .selectByIndex('#isdroneshoot-bns', cases.DRONE_SHOOT == true ? 1 : 2).then(() => {
                        console.log(`Set drone shoot to: ${cases.DRONE_SHOOT == true ? 'Yes' : 'No'}\n\n`);
                  }).catch((e)=>console.error(`Could not set drone shoot: ${e}`))

                  // Sets Transmission Type
                  .pause(500)
                  .selectByIndex('#transmissiontype-bns', cases.TRANSMISSION_TYPE_INDEX).then(() => {
                        console.log(`Set transmission type to: ${cases.TRANSMISSION_TYPE_INDEX}\n\n`);
                  }).catch((e)=>console.error(`Could not set transmission type: ${e}`))

                  // Sets Resources
                  .pause(500)
                  .selectByIndex('#numcamera-bns', cases.RESOURCE_CAMERA - 1).then(() => {
                        console.log(`Sets camera resource: ${cases.RESOURCE_CAMERA}\n\n`);
                  }).catch((e)=>console.error(`Could not set camera resource: ${e}`))

                  .pause(500)
                  .selectByIndex('#numaudio-bns', cases.RESOURCE_AUDIO).then(() => {
                        console.log(`Set audio resource: ${cases.RESOURCE_AUDIO}\n\n`);
                  }).catch((e)=>console.error(`Could not set audio resource: ${e}`))

                  // Submit form
                  .click('*[next="success"]').then(() => {
                        console.log(`Clicked Submit.\n\n`);
                  }).catch((e)=>console.error(`Could not click Submit: ${e}`))
                  .pause(1250)

                  .click('.button-close').then(() => {
                        console.log(`Clicked Close.\n\n`);
                  }).catch((e)=>console.error(`Could not click Close: ${e}`))
                  .pause(500)

                  // Ends program
                  .end().then(() => {
                        console.log(`Closed Breaking News window.\n\n`);
                        resolve();
                  }).catch(() => {
                        console.log(`Could not close Breaking News window.\n\n`);
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

let loopInstance = (device, username, password, cases, count, passes = 0, terminate = null) => {
      if (count > 0) {
            cases = cases ? cases[count - cases.length] : null;
            breakingNews(device, username, password, cases).then(() => {
                  return loopInstance(device, username, password, cases, --count, ++passes, terminate);
            }).catch(() => {
                  return loopInstance(device, username, password, cases, --count, passes, terminate);
            });
      } else if (terminate) return terminate(passes);
}

module.exports = {
      breakingNews, loop
};
