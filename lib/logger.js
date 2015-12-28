var winston = require('winston');

module.exports = {

  logHook: new winston.Logger({
    level: 'info',
    transports: [
      new (winston.transports.Console)()
    ]
  }),

  initialize: function() {
    var fs = require('fs');

    if(!fs.existsSync(appRoot + '/logs')) {
      this.info("Initializing logging directory: " +  appRoot + '/logs');
      fs.mkdirSync(appRoot + '/logs');
    }

    // configure winston file transport
  },

  info: function(message) {
    this.logHook.info(message);
  },

  debug: function(message) {
    this.logHook.debug(message);
  },

  error: function(message) {
    this.logHook.error(message);
  }
};
