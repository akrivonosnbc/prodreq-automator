/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /index.js
*/

// Imports
const argv = require('yargs').argv;

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
const DEFAULT_PROCESS = {
      DEVICE: 'desktop',
      REQUEST: 'crew',
      TYPE: 'bureau_camera',
      LOOP: false,
      COUNT: 1,
      INSTANCES: 1
};

let run = (username, password, device = null, request = null, type = null, cases = null, loop = null, count = null, instances = null) => {
      return new Promise((resolve, reject) => {
            if (argv) {
                  device = (device || argv.device || argv.device || DEFAULT_PROCESS.DEVICE || "").trim().toLowerCase();
                  request = (request || argv.request || argv.r || DEFAULT_PROCESS.REQUEST || "").trim().toLowerCase();
                  type = (type || argv.type || argv.t || DEFAULT_PROCESS.TYPE || "").trim().toLowerCase();
                  cases = (cases || argv.cases || argv.ca || null);
                  loop = (loop || argv.loop || argv.l || DEFAULT_PROCESS.LOOP || "").trim().toLowerCase() === 'true';
                  count = count || (loop ? (argv.count || argv.c || DEFAULT_PROCESS.COUNT || 1) : 1);
                  instances = instances || (loop ? (argv.instances || argv.instance || argv.i || DEFAULT_PROCESS.INSTANCES || 1) : 1);
                  let casesPassed = (passes) => [passes, count * instances];
                  let runCases = (loop) => {
                        if (cases != null) {
                              parser.read(`cases/${request}/types/${type}/${cases}`).then((cs) => {
                                    count = cs && cs.length > 0 ? cs.length : count;
                                    if (cs.length == 0) cs = null;
                                    cases = cs;
                                    loop().then(() => resolve()).then(() => {
                                          console.log('Done');
                                          resolve(casesPassed(passes));
                                    });
                              }).catch((e) => reject(casesPassed(0)));
                        } else {
                              loop().then(() => {
                                    console.log('Done');
                                    resolve(casesPassed(passes));
                              });
                        }
                  };
                  switch (request) {
                        case 'crew':
                              switch (type) {
                                    case 'bureau_camera':
                                          runCases(crew.bureau_camera.loop(device, username, password, cases, count, instances));
                                          break;
                                    case 'breaking_news':
                                          runCases(crew.breaking_news.loop(device, username, password, cases, count, instances));
                                          break;
                                    case 'general':
                                          runCases(crew.general.loop(device, username, password, cases, count, instances));
                                          break;
                                    default:
                                          reject(casesPassed(0));
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
                                          reject(casesPassed(0));
                                          break;
                              }
                              break;
                        case 'file_ingest':
                              break;
                        case 'studio':
                              switch (type) {
                                    case 'single_camera':
                                          runCases(studio.single_camera.loop(device, username, password, cases, count, instances));
                                          break;
                                    case 'extend_or_bridge':
                                          break;
                                    case 'all':
                                          break;
                                    default:
                                          reject(casesPassed(0));
                                          break;
                              }
                              break;
                        default:
                              reject(casesPassed(0));
                              break;
                  }
            } else {
                  console.error('Could not retrieve arguments.');
                  return reject(casesPassed(0));
            }
      });
};

let runRequest = (username, password, req) => {
      return new Promise((resolve, reject) => {
            let device = (req.device || req.device || DEFAULT_PROCESS.DEVICE || "").trim().toLowerCase(),
                  request = (req.request || req.r || DEFAULT_PROCESS.REQUEST || "").trim().toLowerCase(),
                  type = (req.type || req.t || DEFAULT_PROCESS.TYPE || "").trim().toLowerCase(),
                  cases = req.cases || req.ca || {},
                  loop = (req.loop || req.l || DEFAULT_PROCESS.LOOP || "").trim().toLowerCase() === 'true',
                  count = cases && cases.length > 0 ? cases.length : (loop ? (req.count || req.c || DEFAULT_PROCESS.COUNT || 1) : 1),
                  instances = loop ? (req.instances || req.instance || req.i || DEFAULT_PROCESS.INSTANCES || 1) : 1;
            if (!cases || cases.length == 0) cases = null;
            let casesPassed = (passes) => [passes, count * instances];
            switch (request) {
                  case 'crew':
                        switch (type) {
                              case 'bureau_camera':
                                    crew.bureau_camera.loop(device, username, password, cases, count, instances).then((passes) => {
                                          console.log('Done');
                                          resolve(casesPassed(passes));
                                    });
                                    break;
                              case 'breaking_news':
                                    crew.breaking_news.loop(device, username, password, cases, count, instances).then((passes) => {
                                          console.log('Done');
                                          resolve(casesPassed(passes));
                                    });
                                    break;
                              case 'general':
                                    crew.general.loop(device, username, password, cases, count, instances).then(() => {
                                          console.log('Done');
                                          resolve(casesPassed(passes));
                                    });
                                    break;
                              default:
                                    reject(casesPassed(0));
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
                                    studio.single_camera.loop(device, username, password, cases, count, instances).then((passes) => {
                                          console.log('Done');
                                          resolve(casesPassed(passes));
                                    });
                                    break;
                              case 'extend_or_bridge':
                                    break;
                              case 'all':
                                    break;
                              default:
                                    reject(casesPassed(0));
                                    break;
                        }
                        break;
                  default:
                        reject(casesPassed(0));
                        break;
            }
      });
};

module.exports = {
      run, runRequest
}
