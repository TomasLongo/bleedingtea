var fs = require("fs");

module.exports = function(file) {
  this.initFile(file);
}

module.exports.prototype.initFile = function(file) {
  this.stream = fs.createWriteStream(file, {flags:'a'});
}

module.exports.prototype.write = function(message) {
  this.stream.write(message);
}

if (require.main === module) {
  function log(appender, message) {
    appender.write(message);
  }

  var FA = module.exports;
  var appender = new FA("foo.log");
  log(appender, "[INFO] Hi there");

  setTimeout(function() { log( appender, "[ERROR] an error occured"); }, 1000);
}
