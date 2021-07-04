import { AbortException } from './core-utils.js'
import { conf } from './stellaris-conf.js'
import pkg from 'sqlite3'
const { Database } = pkg

const execQuery = async (sql) => {
    return new Promise((resolve, reject) => {
        let stellarisPlaylistDB;
        try {
            console.log(`INFO: Opening Database: ${conf.stellaris.documents.db}`);
            const stellarisPlaylistDB = new Database(conf.stellaris.documents.db);
            stellarisPlaylistDB.all(sql, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    if (results === null) {
                        console.error(`ERROR: No results from query for playlist or mods. ${conf.stellaris.documents.db}`);
                    }
                    resolve(results === null ? [] : results);
                }
            });
        } catch (err) {
            reject(err);
        } finally {
            if (stellarisPlaylistDB) {
                stellarisPlaylistDB.close();
            }
        }
    });
}

/** 
 * Get playset from stellaris launcher database.
 * default is to get the active playset,
 * otherwise pass a playsetName or playsetId in options.
 */
export const getPlayset = async ({
    playsetName,
    playsetId
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = '';
            const condition = (playsetName !== undefined) 
                ? ` and p.name = '${playsetName}' ` 
                : (playsetId !== undefined) 
                    ? ` and p.playsetId = '${playsetId}' ` 
                    : ` and p.isActive = true `;
            // TODO: move to parameterized prepared queries to prevent SQL
            // injection if we ever host this for the public
            sql = `select m.*, pm.*, p.* from playsets p
                            join playsets_mods pm on p.id = pm.playsetId
                            join mods m on pm.modId = m.id
                            where pm.enabled and status = 'ready_to_play' ${condition}
                            order by pm.position;`;
            
            const results = await execQuery(sql);
            resolve(results);
        } catch (error) {
            AbortException(`Failed to load ${playsetName} from Stellaris launcher`, error);
        }
    });
}

export const getPlaysetSync = async (options = {}) => {
    return await getPlayset(options);
}

export const getAllReadyToPlay = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `select m.* from mods m
                                where status = "ready_to_play"
                                order by displayName desc;`;
            const results = await execQuery(sql);
            WriteJSON(INDEX_ROOT_CRUNCH, `${playsetName}-crunch-playlist.json`, results);
            resolve(results);
        } catch (error) {
            AbortException(`Failed to load ${playsetName} from Stellaris launcher`, error);
        }
    });
}


export const getAllReadyToPlaySync = async () => {
    return await getAllReadyToPlay(options);
}