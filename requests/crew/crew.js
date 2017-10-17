/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /crew/crew.js
*/

// Imports
const driver = require('../../driver/driver.js');

// Config
const CREW_URL = "https://stgconnect.inbcu.com/sites/bcast_prodreq/Pages/Crew-Request.aspx?DP=ProducerDashboard";
const WINDOW_SIZE = {
      width: 1600,
      height: 1200
}

// Crew Client Class
function Client (username = null, password = null) {
      return new driver.Client(null, username, password)
            .setViewportSize(WINDOW_SIZE, false).then(() => {
                  console.log(`Set window size: ${JSON.stringify(WINDOW_SIZE, null, 2)}`);
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
