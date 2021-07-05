import path from 'path';
import { spawn } from 'child_process'

import { conf } from './stellaris-conf.js'
import { LoadJSON } from './core-utils.js'
import { getPlaysetSync } from './stellaris-db.js'
import { getMostRecentFile } from './core-utils.js'

const defaults = {
  cwd: path.dirname(conf.executable),
  env: process.env,
  argv: [],
  shell: false
};

export const mods_registry = LoadJSON(defaults.cwd, 'mods_registry.json');
export const game_data = LoadJSON(defaults.cwd, 'game_data.json');
export const playset = getPlaysetSync();

export const StellarisLauncher = (options) => {
  const launchOpts = { ...defaults, ...options }
  const process = spawn(conf.executable, launchOpts);
  process.on('close', (code, signal) => {
    console.log(`INFO: close ${conf.executable} closed with code ${code} and signal of ${signal}.`);
  });
  process.on('disconnect', () => {
    console.warn(`WARNING: disconnect ${conf.executable} disconnected`);
  });
  process.on('error', () => {
    console.error(`ERROR: ${conf.executable} 💥💥💥💥💥 failed to spawn, could not be killed, or sending a message to it failed.`);
    conf.events.emit('stellaris-crashed', { mods_registry, game_data, playset, crash: getMostRecentFile(conf.documents.crashes) })
  });
  process.on('exit', (code, signal) => {
    console.log(`INFO: exit ${conf.executable} exited with code ${code} ${signal}`);
    conf.events.emit('stellaris-exited', { mods_registry, game_data, playset })
  });
  process.on('message', (message, sendHandle) => {
    console.warn(`WARNING: message ${conf.executable} sent a message ${message} now this is getting super weird since it should not ever do this!`);
  });

  process.on('spawn', (code) => {
    console.log(`INFO: spawn ${conf.executable} 🚀🚀🚀🚀🚀 GOOD LUCK`);
    conf.events.emit('stellaris-launched', { mods_registry, game_data, playset })
  });
}