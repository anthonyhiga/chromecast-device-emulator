'use strict';

var path = require('path');

var _require = require('../log'),
    log = _require.log,
    error = _require.error;

var CastDeviceEmulator = require('../');
var repl = require('repl');

function startEmulator(filepath, cmd) {
  var fullPath = path.resolve(process.cwd(), filepath);
  var emulator = new CastDeviceEmulator();
  try {
    emulator.loadScenario(require(fullPath));
    log('Scenario file <' + fullPath + '> has been loaded.');
    emulator.start();
  } catch (err) {
    error(err);
  }
}

function startInteractive(filepath, cmd) {
  var commandFile = null;
  var emulator = new CastDeviceEmulator();
  if (filepath) {
    var fullPath = path.resolve(process.cwd(), filepath);
    log('Command file <' + fullPath + '> has been loaded.');
    commandFile = require(fullPath);
  }
  try {
    log('Starting interactive session. (.exit to quit)');
    var replServer = repl.start('Cast>');

    emulator.start(null, function (connection) {
      if (commandFile) {
        commandFile(replServer, connection);
      }
    });

    replServer.on('exit', function () {
      console.log('Exiting session');
      process.exit();
    });
  } catch (err) {
    error(err);
  }
}

module.exports = {
  startEmulator: startEmulator,
  startInteractive: startInteractive
};