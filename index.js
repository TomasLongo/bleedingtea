var ConsoleAppender = require("./appenders/consoleappender.js");

module.exports =  {
  active : true,

  filler : "\t",

  registeredAppenders : [],

  consoleAppender : new ConsoleAppender(),

  info : function(message) {
    if (this.active) {
      if (this.registeredAppenders.length == 0) {
        this.consoleAppender.write("[INFO]" + this.filler + message + "\n");
      } else {
        this.goThroughAppenders("[INFO]" + this.filler + message + "\n");
      }
    }
  },

  error : function(message) {
    if (this.active) {
      if (this.registeredAppenders.length == 0) {
        this.consoleAppender.write("[ERROR]" + this.filler + message + "\n");
      } else {
        this.goThroughAppenders("[ERROR]" + this.filler + message + "\n");
      }
    }
  },

  warning : function(message) {
    if (this.active) {
      if (this.registeredAppenders.length == 0) {
        this.consoleAppender.write("[WARNING]" + this.filler + message + "\n");
      } else {
        this.goThroughAppenders("[WARNING]" + this.filler + message + "\n");
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
}
