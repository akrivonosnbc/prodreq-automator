/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /index.js
*/

// Imports
const argv = require('yargs').argv;
const chromedriver = require('chromedriver');

const parser = require('./case_parser/parser');

const crew = {
      breaking_news: require('./requests/crew/types/breaking_news'),
      bureau_camera: require('./requests/crew/types/bureau_camera'),
      general: require('./requests/crew/types/general')
};
const studio = {
      single_camera: require('./requests/studio/types/single_camera')
};

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

      process.on('exit', (code) => chromedriver.stop());
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
                        instances = loop ? (argv.instances || argv.instance || argv.i || DEFAULT_PROCESS.INSTANCES || 1) : 1,
                        cases = (argv.cases || argv.ca || DEFAULT_PROCESS.CASES || "").trim();
                  switch (request) {
                        case 'crew':
                              switch (type) {
                                    case 'bureau_camera':
                                          crew.bureau_camera.loop(device, username, password, count, instances).then(() => resolve());
                                          break;
                                    case 'breaking_news':
                                          crew.breaking_news.loop(device, username, password, count, instances).then(() => resolve());
                                          break;
                                    case 'general':
                                          crew.general.loop(device, username, password, count, instances).then(() => resolve());
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
                              switch (type) {
                                    case 'single_camera':
                                          console.log(`Looping through studio single camera`);
                                          parser.read(`cases/studio/types/single_camera/${cases}`).then((csv) => {
                                                console.log(`Read cases: ${JSON.stringify(cases)}`);
                                                resolve();
                                          });
                                          // studio.single_camera.loop(device, username, password, count, instances).then(() => {
                                          //       console.log('Done');
                                          //       resolve();
                                          // });
                                          break;
                                    case 'extend_or_bridge':
                                          break;
                                    case 'all':
                                          break;
                                    default:
                                          break;
                              }
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
