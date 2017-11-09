/*
      Anthony Krivonos
      Producer Request Automator
      11/07/2017
      /studio/studio.js
*/

// Imports
const driver = require('../../driver/driver.js');

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
            .leftClick('.producer-dashboard-newStudioRequest', 0, 0).then(() => {
                  console.log(`Clicked on New Studio Request.\n\n`);
            }).catch((e)=>console.error(`Could not click on New Studio Request: ${e}`))
            .getUrl().then((url) => {
                  console.log('Created new Studio Request Client at ' + url);
            }).catch(() => console.log('Could not create new Studio Request Client'))
}

module.exports = {
      Client
};
