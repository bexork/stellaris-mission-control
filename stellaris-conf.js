import path from 'path'
import EventEmitter from 'events'
import {
    Exists
} from 'core-utils.js'
import {
    readSync
} from "node-yaml"
import {
    getFiles
} from './core-utils.js'

export const load = (filePath) => {
    const conf = readSync(filePath)

    conf.USER_HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    conf.events = new EventEmitter()

    conf.stellaris.root = path.dirname(conf.stellaris.executable)
    conf.stellaris.launcher.executable = path.join(conf.USER_HOME, conf.stellaris.launcher.executable)
    conf.stellaris.launcher.root = path.dirname(conf.stellaris.launcher.executable)

    conf.stellaris.documents.root = path.join(conf.USER_HOME, conf.stellaris.documents.root)
    conf.stellaris.documents.db = path.join(conf.stellaris.documents.root, conf.stellaris.documents.db)
    conf.stellaris.documents.logs = path.join(conf.stellaris.documents.root, conf.stellaris.documents.logs)
    const logFiles = getFiles(conf.stellaris.documents.logs)
    conf.stellaris.documents.logFiles = {}
    for (const log of logFiles.filter(f => f.file.endsWith('.log'))) {
        conf.stellaris.documents.logFiles[path.basename(log.file, '.log')] = log.filePath
    }
    conf.stellaris.documents.mods = path.join(conf.stellaris.documents.root, conf.stellaris.documents.mods)
    conf.stellaris.documents.crashes = path.join(conf.stellaris.documents.root, conf.stellaris.documents.crashes)

    conf.events.emit('mission-control-conf-ready', conf)
}

export let conf = {}
if (Exists('./mission-control.yaml')) {
    conf = load('./mission-control.yaml')
}
