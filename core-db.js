import { AbortException } from './core-utils.js'
import { conf } from './core-conf.js'

import SQLITE3DB from 'better-sqlite3'

console.log(`INFO: Opening Database: ${conf.documents.db}`)
const db = new SQLITE3DB(conf.documents.db, {})

/**
 * Get playset from stellaris launcher database.
 * default is to get the active playset,
 * otherwise pass a playsetName or playsetId in options.
 */
export const getPlayset = (options) => {
    const {
        playsetName,
        playsetId
    } = options === undefined ? {} : options
    let sql = ''
    let condition = ''
    let param = null
    if (playsetId) {
        condition = ` and p.playsetId = '${playsetId}' `
        param = playsetId
    } else if (playsetName) {
        condition = ` and p.name = '${playsetName}' `
        param = playsetName
    } else {
        condition = ' and p.isActive = true '
        param = undefined
    }

    sql = `select m.*, pm.*, p.* from playsets p
                    join playsets_mods pm on p.id = pm.playsetId
                    join mods m on pm.modId = m.id
                    where pm.enabled and status = 'ready_to_play' ${condition}
                    order by pm.position;`;

    return db.prepare(sql).all();
}

export const getAllReadyToPlay = () => {
    try {
        let sql = "select m.* from mods m where status = 'ready_to_play' order by displayName desc";
        return db.prepare(sql).all();
    } catch (error) {
        AbortException(`getAllReadyToPlay query failed`, error);
    }
}
