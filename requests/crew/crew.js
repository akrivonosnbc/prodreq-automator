/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /crew/crew.js
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

// Crew Client Class
function Client (device = 'desktop', username = null, password = null) {
      return new driver.Client(null, username, password)
            .setViewportSize(device == 'desktop' ? WINDOW_SIZE.DESKTOP : WINDOW_SIZE.MOBILE, false).then(() => {
                  console.log(`Set window size for ${device}`);
            }).catch((e)=>console.log(`Could not set window size: ${e}`))
            .click('.producer-dashboard-newCrewRequest').then(() => {
                  console.log(`Clicked on New Crew Request.\n\n`);
            }).catch((e)=>console.error(`Could not click on New Crew Request: ${e}`))
            .getUrl().then((url) => {
                  console.log('Created new Crew Request Client at ' + url);
            })
}

module.exports = {
      Client
};
