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
