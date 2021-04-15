const path = require('path');
const { log, error } = require('../log');
const CastDeviceEmulator = require('../');
const repl = require('repl');

function startEmulator(filepath, cmd) {
  const fullPath = path.resolve(process.cwd(), filepath);
  const emulator = new CastDeviceEmulator();
  try {
    emulator.loadScenario(require(fullPath));
    log(`Scenario file <${fullPath}> has been loaded.`);
    emulator.start();
  } catch (err) {
    error(err);
  }
}

function startInteractive(filepath, cmd) {
  let commandFile = null;
  const emulator = new CastDeviceEmulator();
  if (filepath) {
    const fullPath = path.resolve(process.cwd(), filepath);
    log(`Command file <${fullPath}> has been loaded.`);
    commandFile = require(fullPath);
  }
  try {
    log(`Starting interactive session. (.exit to quit)`);
    const replServer = repl.start('Cast>');

    emulator.start(null, function(connection) {
      if (commandFile) {
        commandFile(replServer, connection);
      }
    });

    replServer.on('exit', () => {
      console.log('Exiting session');
      process.exit();
    });
  } catch (err) {
    error(err);
  }
}

module.exports = {
  startEmulator,
  startInteractive,
};
