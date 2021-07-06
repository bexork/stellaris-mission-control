import { takeMatches } from './core-match.js'
import { conf } from './stellaris-conf.js'
import { EncodeJSON } from './core-utils.js'

const StellarisBodyParser = (newLine) => {
    let startedLine = false;

    const lineExp = /^\[(?<timestamp>\d\d\:\d\d:\d\d)\]\[(?<filename>[\w|\d]*\.\w*)\:(?<linenumber>\d*)\]\:(?<body>.*)$/g  // Extracts: Timestamp, Filename, LineNumber, LineBody
    // expects matches.length = 5

    const meta = {
        src: newLine
    };
    const matches = takeMatches(lineExp, meta, newLine.line.trim());
    if (!matches || matches.length !== 5 && startedLine) {
        meta.continuation = newLine
        if (startedLine) {
            if (!startedLine.includes) {
                startedLine.includes = [];
            }
            startedLine.includes.push(meta);
            conf.events.emit('stellaris-log-continued', startedLine)
        } else {
            // this is a continuation but we don't know where it goes
            conf.events.emit('stellaris-log-lost', meta)
        }
    } else {
        // this was not a continuation so close the open line if needed 
        if (startedLine && startedLine.includes) {
            startedLine.body = startedLine.includes.map(include => include.continuation).join('\n');
            conf.events.emit('stellaris-log-end', startedLine)
        } 
        
        startedLine = meta;
        conf.events.emit('stellaris-log-start', meta)
    }

    console.warn(`BODYPARSER: meta = ${EncodeJSON(meta)}`)
}

conf.events.on('stellaris-line', StellarisBodyParser)