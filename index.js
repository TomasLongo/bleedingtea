var ConsoleAppender = require("./appenders/consoleappender.js"),
    util = require('util');

module.exports =  {
  active : true,

  filler : "\t",

  registeredAppenders : [],

  consoleAppender : new ConsoleAppender(),

  info : function(message) {
    if (this.active) {
      var formatted = util.format("%s %s: %s", "[INFO]", new Date().toUTCString(), message);
      if (this.registeredAppenders.length == 0) {
        this.consoleAppender.write(formatted + "\n");
      } else {
        this.goThroughAppenders(formatted + "\n");
      }
    }
  },

  error : function(message) {
    if (this.active) {
      var formatted = util.format("%s %s: %s", "[ERROR]", new Date().toUTCString(), message);
      if (this.registeredAppenders.length == 0) {
        this.consoleAppender.write(formatted + "\n");
      } else {
        this.goThroughAppenders(formatted + "\n");
      }
    }
  },

  warning : function(message) {
    if (this.active) {
      var formatted = util.format("%s %s: %s", "[WARNING]", new Date().toUTCString(), message);
      if (this.registeredAppenders.length == 0) {
        this.consoleAppender.write(formatted + "\n");
      } else {
        this.goThroughAppenders(formatted + "\n");
      }
    }
  },

  addAppender : function(appender) {
    this.registeredAppenders.push(appender);
  },

  goThroughAppenders : function(message) {
    this.registeredAppenders.forEach(function(appender) {
      appender.write(message);
    });
  }
}

module.exports.appenders = {
  FileAppender : require("./appenders/fileappender")
}


if (require.main === module) {
  var FA = new require("./appenders/fileappender.js");

  var logger = module.exports;

  // At this point no appenders have been added to the logger,
  // so it should fallback to the console
  logger.info("This goes to console only");

  logger.addAppender(new FA("foofoo.log"));

  logger.error("This should only go to file!!");
  logger.warning("And this too");
}
