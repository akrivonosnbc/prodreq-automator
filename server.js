/*
      Anthony Krivonos
      Producer Request Automator
      12/06/2017
      /server.js
*/

'use strict';


// Imports
const chromedriver = require('chromedriver');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const xoauth2 = require('xoauth2');
const cors = require('cors');
const morgan  = require('morgan');

const runner = require('./runner');

const app = express();
const upload = multer();

// Config
const DRIVER_ARGS = [ /* optional arguments */ ];
const SSO = "SSO".toLowerCase();
const PWD = "PWD".toLowerCase();
const PORT = process.env.PORT || 3000;
const STATUS = {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      NOT_MODIFIED: 304,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      SERVER_ERROR: 500
};
const CORS_OPTIONS = {
     "origin": "*",
     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
     "preflightContinue": true,
     "allowedHeaders": `Content-Type,Authorization,${SSO},${PWD},X-Requested-With,Access-Control-Allow-Methods`
};

app.use(bodyParser.json());
app.use(cors(CORS_OPTIONS));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.post('/:request', upload.array(), function (req, res, next) {
      var sso = req.headers[SSO], password = req.headers[PWD], requestType = req.params.request;
      console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
      let startTime = Date.now();

      chromedriver.start(DRIVER_ARGS);
      console.log(`\n\n\nGot SSO:${sso}, PWD:${password}`);

      runner.runRequest(sso, password, req.body.device, requestType, req.body.type, req.body.cases, req.body.loop, req.body.count, req.body.instances)
            .then((passed) => {
                  chromedriver.stop();
                  let timeElapsed = Math.round((Date.now() - startTime) / 100) / 10;
                  res.status(STATUS.OK).send(
                        `
                              <html>
                                    <head>
                                          <title>Prodreq Automator Response</title>
                                    </head>
                                    <body>
                                          <h3 style="color:green">Process Finished: 200</h3>
                                          <h2>${passed[0]} of ${passed[1]} Test Cases Passed</h2>
                                          <p>Took ${timeElapsed}s</p>
                                          ${
                                                req.body.cases ?
                                                      `
                                                      <h2>Test Cases</h2>
                                                      <ol>
                                                            ${'<li style="font-family:courier"><pre>' + req.body.cases.map((c) => JSON.stringify(c, null, 2)).join('</pre></li><li style="font-family:courier"><pre>') + '</pre></li>'}
                                                      </ol>`
                                                : ''
                                          }
                                    </body>
                              </html>
                        `
                  );
            }).catch(() => {
                  chromedriver.stop();
                  let timeElapsed = Math.round((Date.now() - startTime) * 10) / 10000;
                  res.status(STATUS.SERVER_ERROR).send(
                        `
                              <html>
                                    <head>
                                          <title>Prodreq Automator Response</title>
                                    </head>
                                    <body>
                                          <h3 style="color:red">Process Error: 500</h3>
                                          <h2>${passed[0]} of ${passed[1]} Test Cases Passed</h2>
                                          <p>Took ${timeElapsed}s</p>
                                          ${
                                                req.body.cases ?
                                                      `
                                                      <h2>Test Cases</h2>
                                                      <ol>
                                                            ${'<li style="font-family:courier"><pre>' + req.body.cases.map((c) => JSON.stringify(c, null, 2)).join('</pre></li><li style="font-family:courier"><pre>') + '</pre></li>'}
                                                      </ol>`
                                                : ''
                                          }
                                    </body>
                              </html>
                        `
                  );
                  chromedriver.stop();
            });
});

app.listen(PORT, function () {
      console.log(`Producer Request Dashboard Established Connection on Port ${PORT}`);
});
