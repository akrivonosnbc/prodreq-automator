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

};

// SingleCamera Class
let singleCamera = (device = 'desktop', username = null, password = null) => {
      return new Promise((resolve, reject) => {
            new studio.Client(device, username, password)
                  //Initialize
                  .pause(500)
                  .getUrl().then((url) => {
                        console.log('Created new Single Camera Live Shot from Plaza Productions Client at ' + url);
                  }).catch(()=>console.log('Could not create new Single Camera Live Shot from Plaza Productions Client'))
                  .frame(1).then(() => {
                        console.log(`Clicked on iFrame\n\n`);
                  }).catch((e)=>console.error(`Could not click on iFrame: ${e}`))

                  // Presses button to initiate Single Camera Live Shot from Plaza Productions Studio Request
                  .click('*[title="Single Camera Live Shot from Plaza Productions"]').then(() => {
                        console.log(`Clicked Single Camera Live Shot from Plaza Productions.\n\n`);
                  }).catch((e)=>console.error(`Could not click Single Camera Live Shot from Plaza Productions: ${e}`))

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
            singleCamera(device, username, password).then(() => {
                  return loopInstance(device, username, password, --count, terminate);
            }).catch(() => {
                  return loopInstance(device, username, password, --count, terminate);
            });
      } else if (terminate) return terminate();
}

module.exports = {
      singleCamera, loop
};
