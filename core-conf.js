import path from 'path'
import EventEmitter from 'events'

import { readSync } from "node-yaml"

import { AbortError, Exists } from './core-utils.js'
import { getFiles } from './core-utils.js'

/** Single instance of configuration */
const StartMission = () => {
  if (global.STARKEEPER) {
    return global.STARKEEPER
  }
  const configFile = path.join(process.cwd(), './.mission-control.yaml');
  console.log(configFile)
  if (!Exists(configFile)) {
      AbortError("Misson Control File is Missing. We cannot launch without Mission Control!")
  }

  const loadedConf = readSync(configFile)
  const conf = loadedConf.stellaris

  const USER_HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

  conf.events = new EventEmitter()
  conf.root = path.dirname(conf.executable)

  if (conf.launcher !== undefined) {
      conf.launcher.executable = path.join(USER_HOME, conf.launcher.executable)
      conf.launcher.root = path.dirname(conf.launcher.executable)
  }

  conf.documents.root = path.join(USER_HOME, conf.documents.root)
  conf.documents.db = path.join(conf.documents.root, conf.documents.db)
  conf.documents.mods = path.join(conf.documents.root, conf.documents.mods)
  conf.documents.crashes = path.join(conf.documents.root, conf.documents.crashes)

  conf.documents.logs = path.join(conf.documents.root, conf.documents.logs)
  const logFiles = getFiles(conf.documents.logs)
  conf.documents.logFiles = {}
  for (const log of logFiles.filter(f => f.file.endsWith('.log'))) {
      conf.documents.logFiles[path.basename(log.file, '.log')] = log.filePath
  }
  global.STARKEEPER = conf

  conf.events.emit('mission-control-configured', conf)
  return global.STARKEEPER
}

export const conf = !global.STARKEEPER ? StartMission() : global.STARKEEPER;
