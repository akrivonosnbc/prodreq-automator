/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /index.js
*/

// Imports
const chromedriver = require('chromedriver');
const bureau_camera = require('./requests/crew/types/bureau_camera.js');
const breaking_news = require('./requests/crew/types/breaking_news.js');

// Config
// Clear before committing
const DRIVER_ARGS = [
    // optional arguments
];

const USERNAME = '206531939';
const PASSWORD = 'D@sha12345'

const BROWSER_INSTANCES = 5;
const LOOP_COUNT = 10;

chromedriver.start(DRIVER_ARGS);

//breaking_news.breakingNews(USERNAME, PASSWORD);
bureau_camera.bureauCamera(USERNAME, PASSWORD);

// bureau_camera.loop(USERNAME, PASSWORD, LOOP_COUNT, BROWSER_INSTANCES).then(() => {
//       chromedriver.stop();
// });
