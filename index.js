var ConsoleAppender = require("./appenders/consoleappender.js"),
    util = require('util');


var LoggerModule = module.exports = function() {
  this.regex = /%[ldm]/g

  this.active = true;

  this.filler = "\t";

  this.registeredAppenders = [];

  this.consoleAppender = new ConsoleAppender();

  this.messageFormat = "[%l] %d %m";
}

LoggerModule.prototype._format = function(message, data) {
  return this.messageFormat.replace(this.regex, function(match) {
    if (match == "%m") {
      return data.message;
    } else if (match == "%d") {
      return new Date().toISOString();
    } else if (match == "%l") {
      return data.level;
    } else {
      return "";
    }
  });
};

LoggerModule.prototype.info = function(message) {
  if (this.active) {
    var formatted = this._format(this.messageFormat, {level:"INFO", message:message});
    if (this.registeredAppenders.length == 0) {
      this.consoleAppender.write(formatted + "\n");
    } else {
      this.goThroughAppenders(formatted + "\n");
    }
  }
},

LoggerModule.prototype.error = function(message) {
  if (this.active) {
    var formatted = this._format(this.messageFormat, {level:"ERROR", message:message});
    if (this.registeredAppenders.length == 0) {
      this.consoleAppender.write(formatted + "\n");
    } else {
      this.goThroughAppenders(formatted + "\n");
    }
  }
},

LoggerModule.prototype.warning = function(message) {
  if (this.active) {
    var formatted = this._format(this.messageFormat, {level:"WARNING", message:message});
    if (this.registeredAppenders.length == 0) {
      this.consoleAppender.write(formatted + "\n");
    } else {
      this.goThroughAppenders(formatted + "\n");
    }
  }
},

LoggerModule.prototype.addAppender = function(appender) {
  this.registeredAppenders.push(appender);
},

LoggerModule.prototype.goThroughAppenders = function(message) {
  this.registeredAppenders.forEach(function(appender) {
    appender.write(message);
  });
}

// module.exports =  {
//   regex : /%[ldm]/g,
//
//   active : true,
//
//   filler : "\t",
//
//   registeredAppenders : [],
//
//   consoleAppender : new ConsoleAppender(),
//
//   messageFormat : "[%l] %d %m",
//
//   _format : function(message, data) {
//     return this.messageFormat.replace(this.regex, function(match) {
//       if (match == "%m") {
//         return data.message;
//       } else if (match == "%d") {
//         return new Date().toISOString();
//       } else if (match == "%l") {
//         return data.level;
//       } else {
//         return "";
//       }
//     });
//   },
//
//   info : function(message) {
//     if (this.active) {
//       var formatted = this._format(this.messageFormat, {level:"INFO", message:message});
//       if (this.registeredAppenders.length == 0) {
//         this.consoleAppender.write(formatted + "\n");
//       } else {
//         this.goThroughAppenders(formatted + "\n");
//       }
//     }
//   },
//
//   error : function(message) {
//     if (this.active) {
//       var formatted = this._format(this.messageFormat, {level:"ERROR", message:message});
//       if (this.registeredAppenders.length == 0) {
//         this.consoleAppender.write(formatted + "\n");
//       } else {
//         this.goThroughAppenders(formatted + "\n");
//       }
//     }
//   },
//
//   warning : function(message) {
//     if (this.active) {
//       var formatted = this._format(this.messageFormat, {level:"WARNING", message:message});
//       if (this.registeredAppenders.length == 0) {
//         this.consoleAppender.write(formatted + "\n");
//       } else {
//         this.goThroughAppenders(formatted + "\n");
//       }
//     }
//   },
//
//   addAppender : function(appender) {
//     this.registeredAppenders.push(appender);
//   },
//
//   goThroughAppenders : function(message) {
//     this.registeredAppenders.forEach(function(appender) {
//       appender.write(message);
//     });
//   }
// }

module.exports.appenders = {
  FileAppender : require("./appenders/fileappender")
}


if (require.main === module) {
  var FA = new require("./appenders/fileappender.js");

  var logger = new LoggerModule();

  // At this point no appenders have been added to the logger,
  // so it should fallback to the console
  logger.info("This goes to console only");

  logger.addAppender(new FA("foofoo.log"));

  logger.error("This should only go to file!!");
  logger.warning("And this too");

  var loggerTwo = new LoggerModule();
  loggerTwo.info("This is from the second logger and should only go to the console");

  var loggerThree = new LoggerModule();
  loggerThree.active = false;
  loggerThree.info("This should not be printed!!!!!!!!!");
}
