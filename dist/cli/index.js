#!/usr/bin/env node
'use strict';

var program = require('commander');
var manifest = require('../../package.json');

var _require = require('../log'),
    log = _require.log,
    error = _require.error;

var _require2 = require('./app'),
    startEmulator = _require2.startEmulator,
    startInteractive = _require2.startInteractive;

program.name(manifest.name).version(manifest.version, '-v, --version').usage('start <scenarioFilePath>|prompt <commandScriptPath>');

/**
 * Defaults to help command
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

/**
 * start command
 */
program.command('start <filepath>').description('Start a chromecast-device-emulator server that serves with given scenario').action(startEmulator);

program.command('prompt [command script]').description('Start a chromecast-device-emulator interactive server').action(startInteractive);

program.parse(process.argv);