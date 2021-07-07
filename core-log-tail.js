import { conf } from './core-conf.js'

import Tail from 'tail-file'

let tails =  { }
const moo = () => { }

export const StellarisLogMonitor = (logFile) => {
  let lines = []
  let lastErr = 0
  if (!tails[logFile]) {
    const logTail = new Tail(logFile);

    tails[logFile] = logTail
    logTail.on('error', err => { throw (err) });

    logTail.on('line', line => {
      conf.events.emit('stellaris-line', line)
    });
    logTail.on('ready', fd => console.log(`MONITOR: ${conf.documents.logFiles.error} -> (READY)`));
    logTail.on('eof', pos => moo(`MONITOR: ${conf.documents.logFiles.error} -> (EOF)`));
    logTail.on('skip', pos => console.log(`MONITOR: ${conf.documents.logFiles.error} -> (REPLACED)`));
    logTail.on('secondary', filename => console.log(`MONITOR: ${conf.documents.logFiles.error} -> (MISSING) Next log file is missing. Tailing ${filename} instead`));
    logTail.on('restart', reason => {
        if (reason == 'PRIMEFOUND') console.log(`MONITOR: ${conf.documents.logFiles.error} -> (EXISTS)`);
        if (reason == 'NEWPRIME') console.log(`MONITOR: ${conf.documents.logFiles.error} -> (CHANGED)`);
        if (reason == 'TRUNCATE') console.log(`MONITOR: ${conf.documents.logFiles.error} -> (TRUNCATED) - Is this a fresh galaxy?`);
        if (reason == 'CATCHUP') console.log(`MONITOR: ${conf.documents.logFiles.error} -> (CATCHUP) - Start in previous file? We probably should not be seeing this...?`);
    });

    logTail.start();
  } else {
      console.log(`MONITOR: ${conf.documents.logFiles.error}  Stellaris Restarted. Stellaris Log Monitor Ready.`)
  }
}
