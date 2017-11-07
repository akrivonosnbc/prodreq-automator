/*
      Anthony Krivonos
      Producer Request Automator
      11/07/2017
      /studio/studio.js
*/

// Imports
const driver = require('../../driver/driver.js');

// Types
let single_camera = require('./types/single_camera.js');

// Config
const WINDOW_SIZE = {
      DESKTOP: {
            width: 1400,
            height: 1000
      },
      MOBILE: {
            width: 560,
            height: 800
      }
}

// Studio Client Class
function Client (device = 'desktop', username = null, password = null) {
      return new driver.Client(null, username, password)
            .setViewportSize(device == 'desktop' ? WINDOW_SIZE.DESKTOP : WINDOW_SIZE.MOBILE, false).then(() => {
                  console.log(`Set window size for ${device}`);
            }).catch((e)=>console.log(`Could not set window size: ${e}`))
            .click('.producer-dashboard-newStudioRequest').then(() => {
                  console.log(`Clicked on New Studio Request.\n\n`);
            }).catch((e)=>console.error(`Could not click on New Studio Request: ${e}`))
            .getUrl().then((url) => {
                  console.log('Created new Studio Request Client at ' + url);
            })
}

module.exports = {
      Client, single_camera
};
