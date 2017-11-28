/*
      Anthony Krivonos
      Producer Request Automator
      11/28/2017
      /case_parser/parser.js
*/

// Imports
const csv = require("fast-csv");

// Config

// Client Class
let read = (path) => {
      return new Promise((resolve, reject) => {
            validate(path).then((path) => {
                  console.log(`Parsing file from ${path}`);
                  let startTime = Date.now();
                  csv.fromStream(fs.createReadStream(path), {headers : true})
                  .on("data", (data) => {
                        console.log(data);
                        resolve(data);
                  })
                  .on("error", () => {
                        console.error(`Parse error after ${Date.now() - startTime}ms`);
                        reject();
                  })
                  .on("end", () => {
                        console.log(`Parsing took ${Date.now() - startTime}ms`);
                        reject();
                  });
            }).catch(() => reject());
      });
};

let validate = (path) => {
      return new Promise((resolve, reject) => {
            let dotIndex = path.lastIndexOf('.');
            if (dotIndex >= 0) {
                  let extension = path.substring(dotIndex + 1);
                  if (extension != 'csv') reject();
                  else resolve(path);
            } else resolve(`${path}.csv`);
      });
}

module.exports = {
      read
};
