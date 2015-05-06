module.exports = function() {
}

module.exports.prototype.write = function(message) {
  process.stdout.write(message);
}
