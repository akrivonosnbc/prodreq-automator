/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /index.js
*/

// Imports
const argv = require('yargs').argv;
const chromedriver = require('chromedriver');

const runner = require('./runner');

// Config
const DRIVER_ARGS = [ /* optional arguments */ ];

let main = () => {
      chromedriver.start(DRIVER_ARGS);

      checkEnvironment().then((credentials) => {
            runner.run(credentials.username, credentials.password)
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

main();
