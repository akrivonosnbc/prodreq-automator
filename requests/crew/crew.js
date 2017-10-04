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

// Crew Client Class
function Client (username = null, password = null) {
      console.log('Created new Crew Client');
      // Sets client for crew requests
      return new driver.Client(CREW_URL, username, password);
}

module.exports = {
      Client
};
