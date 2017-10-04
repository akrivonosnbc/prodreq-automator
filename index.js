/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /index.js
*/

// Imports
const bureau_camera = require('./requests/crew/types/bureau_camera.js');

// Config
const USERNAME = '206531939';
const PASSWORD = 'D@sha12345'

bureau_camera.bureauCamera(USERNAME, PASSWORD);
