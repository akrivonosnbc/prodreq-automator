/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /index.js
*/

// Imports
const argv = require('yargs').argv;
const isOnline = require('is-online');
const chromedriver = require('chromedriver');
const bureau_camera = require('./requests/crew/types/bureau_camera.js');
const breaking_news = require('./requests/crew/types/breaking_news.js');
const general = require('./requests/crew/types/general.js');

// Config
const DRIVER_ARGS = [ /* optional arguments */ ];
const DEFAULT_PROCESS = {
      DEVICE: 'desktop',
      REQUEST: 'crew',
      TYPE: 'bureau_camera',
      LOOP: false,
      COUNT: 1,
      INSTANCES: 1
};

let main = () => {
      chromedriver.start(DRIVER_ARGS);

      checkEnvironment().then((credentials) => {
            checkProcess(credentials.username, credentials.password)
                  .then(() => chromedriver.stop())
                  .catch(() => chromedriver.stop());
      }).catch(() => {
            chromedriver.stop();
            process.exit(1);
      });
};

let checkEnvironment = () => {
      return new Promise((resolve, reject) => {
            if (argv) {
                  var username = argv.username || argv.u, password = argv.password || argv.p;
                  if (username && password) return resolve({username, password});
                  else if (!username) {
                        console.error('Could not retrieve username.');
                        return reject();
                  }
                  else if (!password) {
                        console.error('Could not retrieve password.');
                        return reject();
                  }
            } else {
                  console.error('Could not retrieve arguments.');
                  return reject();
            }
      });
};

let checkProcess = (username, password) => {
      return new Promise((resolve, reject) => {
            if (argv) {
                  var device = (argv.device || argv.device || DEFAULT_PROCESS.DEVICE || "").trim().toLowerCase()
                        request = (argv.request || argv.r || DEFAULT_PROCESS.REQUEST || "").trim().toLowerCase(),
                        type = (argv.type || argv.t || DEFAULT_PROCESS.TYPE || "").trim().toLowerCase(),
                        loop = (argv.loop || argv.l || DEFAULT_PROCESS.LOOP || "").trim().toLowerCase() === 'true',
                        count = loop ? (argv.count || argv.c || DEFAULT_PROCESS.COUNT || 1) : 1,
                        instances = loop ? (argv.instances || argv.instance || argv.i || DEFAULT_PROCESS.INSTANCES || 1) : 1;
                  switch (request) {
                        case 'crew':
                              switch (type) {
                                    case 'bureau_camera':
                                          bureau_camera.loop(device, username, password, count, instances).then(() => resolve());
                                          break;
                                    case 'breaking_news':
                                          breaking_news.loop(device, username, password, count, instances).then(() => resolve());
                                          break;
                                    case 'general':
                                          general.loop(device, username, password, count, instances).then(() => resolve());
                                          break;
                                    default:
                                          reject();
                                          break;
                              }
                              break;
                        case 'edit':
                              switch (type) {
                                    case 'standard':
                                          break;
                                    case 'long':
                                          break;
                                    case 'msnbc':
                                          break;
                                    case 'am':
                                          break;
                                    default:
                                          break;
                              }
                              break;
                        case 'file_ingest':
                              break;
                        case 'studio':
                              break;
                        default:
                              break;
                  }
            } else {
                  console.error('Could not retrieve arguments.');
                  return reject();
            }
      });
};

main();
