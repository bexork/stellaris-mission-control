import { conf } from './stellaris-conf.js'

import Tail  from 'tail-file'

let logTail = null;

export const StellarisLogMonitor = () => {
    if (!logTail) {
        logTail = new Tail(conf.stellaris.documents.logFiles.error);
        logTail.on('error', err => { throw(err) } );
        logTail.on('line', line => { 
            conf.events.emit('stellaris-line', {line, })
        });
        logTail.on('ready', fd => console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error} -> (READY)`) );
        logTail.on('eof',   pos =>  console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error} -> (EOF)`) );
        logTail.on('skip',  pos => console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error} -> (REPLACED)`) );
        logTail.on('secondary', filename => console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error} -> (MISSING) Next log file is missing. Tailing ${filename} instead`) );
        logTail.on('restart', reason => {
            if(reason == 'PRIMEFOUND') console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error} -> (EXISTS)`);
            if(reason == 'NEWPRIME') console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error} -> (CHANGED)`);
            if(reason == 'TRUNCATE') console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error} -> (TRUNCATED) - Is this a fresh galaxy?`);
            if(reason == 'CATCHUP') console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error} -> (CATCHUP) - Start in previous file? We probably should not be seeing this...?`);
        });
    
        logTail.start();
    } else {
        console.log(`MONITOR: ${conf.stellaris.documents.logFiles.error}  Stellaris Restarted. Stellaris Log Monitor Ready.`)
    }
}

conf.events.on('stellaris-start', StellarisLogMonitor)