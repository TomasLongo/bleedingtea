module.exports =  {
  active : true,

  filler : "\t",

  info : function(message) {
    if (this.active)
      console.log("[INFO]" + this.filler + message);
  },

  error : function(message) {
    if (this.active)
      console.log("[ERROR]" + this.filler + message);
  },

  warning : function(message) {
    if (this.active)
      console.log("[ERROR]" + this.filler + message);
  }
}
