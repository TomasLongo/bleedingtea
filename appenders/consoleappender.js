module.exports = function() {
}

module.exports.prototype.write = function(message) {
  process.stdin.write(message);
}
