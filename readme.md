# BleedingTea - Node Logging

A tiny logging lib.

###Features
* Send log messages to multiple appenders. Featured as of v0.3.0
  * Console Appender: Send output to stdin
  * File Appender: Send output to a file
* Easy to use API inspired by well known Frameworks like [LogBack](http://logback.qos.ch)
* Extend BleedingTea with custom Appender.
* Create your own logging functions that write output with custom label

~~~
// create new logger instance
var logger = new Logger()

// Create new function to output stuff under custom label
logger.label = Logger.createLogFunction(logger, "LABEL")

// use first class function
logger.label("This thing is custom-labeled")

==> [LABEL] This thing is custom-labeled
~~~


###Usage

#### Basic usage. Write to stdin. Errors are written to stderr
~~~
var Logger = require("BleedingTea")

var log = new Logger() // Instance comes with ConsoleAppender
log.info("message")
log.error("message")
log.warning("message")
~~~

#### Send messages to file
~~~
var Logger = require("BleedingTea")

var log = new Logger() // Instance comes with ConsoleAppender
log.addAppender(new Logger.appenders.FileAppender("log.log"))
~~~

Adding an initial new appender will remove the console appender. If aou wish to write to consle too, do `log.addAppender(new Logger.appender.ConsoleAppender())`
