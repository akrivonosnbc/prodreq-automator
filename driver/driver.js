/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /driver/driver.js
*/

// Imports
const webdriverio = require('webdriverio');

// Config
const OPTIONS = { desiredCapabilities: { browserName: 'firefox' } };

// Client Class

function Client (url, username = null, password = null) {
      console.log("Created new Driver Client");
      var env = this, authUrl;

      if (username && password) authUrl = `${url.substring(0, url.indexOf('://') + 3)}${username}:${password}@${url.substring(url.indexOf('://') + 3)}`;

      return webdriverio.remote(OPTIONS).init().url(authUrl || url);
      //
      // // Asynchronously returns title of interface
      // env.title = env.interface.getTitle();
      //
      // env.url = env.interface.getUrl();
      //
      // env.close = () => env.interface.close();
      //
      // // Returns element with specified selectors in document
      // env.element = (el) => env.interface.element(el);
      //
      // env.value = {
      //       // Appends new value to end of current value
      //       add: (key, value) => {
      //             env.interface.addValue(key, value);
      //       },
      //       // Changes value of key
      //       set: (key, value) => {
      //             env.interface.setValue(key, value);
      //       },
      //       // Gets value of key
      //       get: (key) => {
      //             env.interface.getValue(key);
      //       },
      //       // Clears value of key
      //       clear: (key) => {
      //             env.interface.clearElement(key);
      //       }
      // }
      //
      // env.action = {
      //       // Clicks button with key (must specify selector)
      //       click: (key) => {
      //             var button = env.element(key);
      //             button.click();
      //       },
      //       // Double-clicks button with key (must specify selector)
      //       doubleClick: (key) => {
      //             var button = env.element(key);
      //             button.doubleClick();
      //       },
      //       // Drags source key into destination key
      //       doubleClick: (sourceElem,destinationElem) => {
      //             env.interface.dragAndDrop(sourceElem,destinationElem);
      //       },
      //       // Pauses actions for specified period
      //       pause: (s) => {
      //             env.interface.pause(s);
      //       }
      // }
}

module.exports = {
      Client
};
