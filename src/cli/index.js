#!/usr/bin/env node

const program = require('commander');
const manifest = require('../../package.json');
const { log, error } = require('../log');
const { startEmulator, startInteractive } = require('./app');

program
  .name(manifest.name)
  .version(manifest.version, '-v, --version')
  .usage('start <scenarioFilePath>|prompt <commandScriptPath>');

/**
 * Defaults to help command
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

/**
 * start command
 */
program
  .command('start <filepath>')
  .option('--silent', 'Do not display errors')
  .option('--quiet', 'Do not display messages (e.g. >> and <<)')
  .description(
    'Start a chromecast-device-emulator server that serves with given scenario'
  )
  .action(startEmulator);

program
  .command('prompt [command script]')
  .option('--silent', 'Do not display errors')
  .option('--quiet', 'Do not display messages (e.g. >> and <<)')
  .description(
    'Start a chromecast-device-emulator interactive server'
  )
  .action(startInteractive);

program.parse(process.argv);
