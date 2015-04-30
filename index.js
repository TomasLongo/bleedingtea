module.exports =  {
  active : true,

  filler : "\t",

  appenders : [],

  info : function(message) {
    if (this.active) {
      if (this.appenders.length == 0) {
        console.log("[INFO]" + this.filler + message);
      } else {
        this.goThroughAppenders("[INFO]" + this.filler + message);
      }
    }
  },

  error : function(message) {
    if (this.active) {
      if (this.appenders.length == 0) {
        console.log("[ERROR]" + this.filler + message);
      } else {
        this.goThroughAppenders("[ERROR]" + this.filler + message);
      }
    }
  },

  warning : function(message) {
    if (this.active) {
      if (this.appenders.length == 0) {
        console.log("[WARNING]" + this.filler + message);
      } else {
        this.goThroughAppenders("[WARNING]" + this.filler + message);
      }
    }
  },

  addAppender : function(appender) {
    this.appenders.push(appender);
  },

  goThroughAppenders : function(message) {
    this.appenders.forEach(function(appender) {
      appender.write(message);
    });
  }
}

if (require.main === module) {
  var FA = new require("./fileappender.js");

  var logger = module.exports;

  // At this point no appenders have been added to the logger,
  // so it should fallback to the console
  logger.info("This goes to console only");

  logger.addAppender(new FA("foofoo.log"));

  logger.error("This should only go to file!!");
}
