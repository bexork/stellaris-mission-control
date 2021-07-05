import path from 'path'
import EventEmitter from 'events'

import { readSync } from "node-yaml"

import { AbortError, Exists } from './core-utils.js'
import { getFiles } from './core-utils.js'

const configFile = path.join(process.cwd(), './mission-control.yaml');
if (!Exists(configFile)) {
    AbortError("Misson Control File is Missing. We cannot launch without Mission Control!")
}

const loadedConf = readSync(configFile)
export const conf = loadedConf.stellaris

const USER_HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

conf.events = new EventEmitter()
conf.root = path.dirname(conf.executable)


if (conf.launcher !== undefined) {
    conf.launcher.executable = path.join(conf.USER_HOME, conf.launcher.executable)
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

conf.events.emit('mission-control-conf-ready', conf)
