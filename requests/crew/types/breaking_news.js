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
      ADDRESS: "123 Test Address",
      CITY: "New York",
      ZIP: "12345",
      STATE: "NY",
      COUNTRY: "United States of America",
      ADDRESS_NOTES: "Not a Real Address"
}

// BreakingNews Class
let breakingNews = (username = null, password = null) => {
      return new Promise((resolve, reject) => {
            new crew.Client(username, password)

                  //Initialize
                  .getUrl().then((url) => {
                        console.log('Created new Breaking News Client at ' + url);
                  })

                  // WHO

                  // Presses button to initiate Breaking News Crew Request
                  .click('*[title="Breaking News"]').then(() => {
                        console.log(`Clicked Breaking News.\n\n`);
                  }).catch((e)=>console.error(`Could not click Breaking News: ${e}`))
                  // Opens phone edit menu
                  .click('.button-edit-bn=edit').then(() => {
                        console.log(`Clicked phone edit button\n\n`);
                  }).catch((e)=>console.error(`Could not click phone edit button: ${e}`))

                  // Changes value of phone inputs
                  .setValue('*[placeholder="(XXX) XXX-XXXX"]', TEST_DATA.PHONE).then(() => {
                        console.log(`Changed phone number.\n\n`);
                  }).catch((e)=>console.error(`Could not change phone number: ${e}`))
                  .click('.button-edit-bc=save').then(() => {
                        console.log(`Clicked phone save button\n\n`);
                  }).catch((e)=>console.error(`Could not click phone save button: ${e}`))

                  // Sets Producer Same as Requestor
                  .selectByValue('#isproducerBN', TEST_DATA.PRODUCER_SAME_AS_REQUESTOR).then(() => {
                        console.log(`Selected ${TEST_DATA.PRODUCER_SAME_AS_REQUESTOR} to \"Is producer same as requestor?\"\n\n`);
                  }).catch((e)=>console.error(`Could not select ${TEST_DATA.PRODUCER_SAME_AS_REQUESTOR} to \"Is producer same as requestor?\" ${e}`))
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
                  .setValue('#txtStoryName-bns', TEST_DATA.STORY.substring(0,3) + ' ').then(() => {
                        console.log(`Set story to: ${TEST_DATA.STORY}\n\n`);
                  }).catch((e)=>console.error(`Could not set story: ${e}`))
                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Dummy Assignment Slug
                  .addValue('#assignmentslug-bns', ' ' + TEST_DATA.SLUG).then(() => {
                        console.log(`Set assignment slug to: ${TEST_DATA.SLUG}\n\n`);
                  }).catch((e)=>console.error(`Could not set assignment slug: ${e}`))

                  // Sets talent from dropdown
                  .click('#talent_bns_0').then(() => {
                        console.log(`Clicked on talent\n\n`);
                  }).catch((e)=>console.error(`Could not click on talent\n\n`))
                  .setValue('#talent_bns_0', TEST_DATA.TALENT.substring(0,3)).then(() => {
                        console.log(`Set talent to: ${TEST_DATA.TALENT}\n\n`);
                  }).catch((e)=>console.error(`Could not set talent: ${e}`))
                  .pause(500)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(500)

                  // Sets Show Unit Code
                  .click('#txtUnit-bns_0').then(() => {
                        console.log(`Clicked on show unit\n\n`);
                  }).catch((e)=>console.error(`Could not click on show unit\n\n`))
                  .addValue('#txtUnit-bns_0', TEST_DATA.SHOW_UNIT).then(() => {
                        console.log(`Set show unit to: ${TEST_DATA.SHOW_UNIT}\n\n`);
                  }).catch((e)=>console.error(`Could not set show unit: ${e}`))

                  .pause(1000)
                  .keys('Enter').then(()=>console.log(`Enter pressed.`)).catch(e=>console.error(`Could not press enter`))
                  .pause(1000)

                  // Sets Budget Code
                  .addValue('#txtbnscode_0', TEST_DATA.BUDGET_CODE).then(() => {
                        console.log(`Set budget code to: ${TEST_DATA.BUDGET_CODE}\n\n`);
                  }).catch((e)=>console.error(`Could not set budget code: ${e}`))

                  // Attaches Edit Request ID
                  .setValue('#requestid-bns', TEST_DATA.EDITREQUESTID).then(() => {
                        console.log(`Set Edit Request ID to: ${TEST_DATA.EDITREQUESTID}\n\n`);
                  }).catch((e)=>console.error(`Could not set Edit Request ID: ${e}`))

                  // Click Next
                  .click('*[next="bns-wherePage"]').then(() => {
                        console.log(`Clicked Next button to WHERE page\n\n`);
                  }).catch((e)=>console.error(`Could not click Next button to WHERE page: ${e}`))

                  // WHERE

                  // Sets Bureau Location
                  .selectByValue('#bureaulocation-bns', 1).then(() => {
                        console.log(`Selected bureau location\n\n`);
                  }).catch((e)=>console.error(`Could not select bureau location: ${e}`))

                  // Sets Address
                  .setValue('#address-text-bns', TEST_DATA.ADDRESS).then(() => {
                        console.log(`Set Address to: ${TEST_DATA.ADDRESS}\n\n`);
                  }).catch((e)=>console.error(`Could not set Address: ${e}`))
                  .setValue('#address-text-bns2', TEST_DATA.ADDRESS_NOTES).then(() => {
                        console.log(`Set Address Notes to: ${TEST_DATA.ADDRESS_NOTES}\n\n`);
                  }).catch((e)=>console.error(`Could not set Address Notes: ${e}`))
                  .setValue('#city-text-bns', TEST_DATA.CITY).then(() => {
                        console.log(`Set City to: ${TEST_DATA.CITY}\n\n`);
                  }).catch((e)=>console.error(`Could not set City: ${e}`))
                  .selectByValue('#state-select-bns', TEST_DATE.STATE).then(() => {
                        console.log(`Set State to: ${TEST_DATA.STATE}\n\n`);
                  }).catch((e)=>console.error(`Could not set State: ${e}`))
                  .selectByValue('#country-select-bns', TEST_DATE.COUNTRY).then(() => {
                        console.log(`Set Country to: ${TEST_DATA.COUNTRY}\n\n`);
                  }).catch((e)=>console.error(`Could not set Country: ${e}`))

                  // Ends program
                  // .end().then(() => {
                  //       console.log(`Closed Breaking News window.\n\n`);
                  //       resolve();
                  // }).catch(() => {
                  //       console.log(`Could not close Breaking News window.\n\n`);
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
            breakingNews(username, password).then(() => {
                  loopInstance(--count);
            }).catch(() => {
                  loopInstance(--count);
            });
      } else {
            if (terminate) terminate();
      }
}

module.exports = {
      breakingNews, loop
};
