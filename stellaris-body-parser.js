import { takeMatches } from './core-match.js'
import { conf } from './core-conf.js'
import { EncodeJSON } from './core-utils.js'
import chalk from 'chalk';

let startedLine = false;

const StellarisBodyParser = (newLine) => {
    const lineExp = /^\[(?<timestamp>\d\d\:\d\d\:\d\d)\]\[(?<filename>[\w|\d]*\.\w*)\:(?<linenumber>\d*)\]\:(?<body>.*)$/g  // Extracts: Timestamp, Filename, LineNumber, LineBody

    const meta = {
      src:          newLine,
      timestamp:    '',
      filename:     '',
      linenumber:   '',
      body:         ''
  }

    const matches = takeMatches(lineExp, meta, newLine.trim());
    if (matches &&  matches !== 5 && startedLine) {
        meta.continuation = true
        if (startedLine) {
            if (!startedLine.includes) {
                startedLine.includes = [];
            }
            startedLine.includes.push(meta);
            conf.events.emit('line-continued', startedLine)
        } else {
            // this is a continuation but we don't know where it goes
          conf.events.emit('line-incomplete', meta)
        }
    } else {
      // this was not a continuation so broadcast line-complete
      if (startedLine) {
        if (startedLine.includes) {
            // if this was a multi-line log this tries to re-assemble the body
            // note this will not be successful 100% in cases where log messages
            // are out of order
            startedLine.body = startedLine.includes.map(include => include.continuation).join('\n');
          }
          conf.events.emit('line-complete', startedLine)
        }

        startedLine = meta;
        conf.events.emit('line-begin', meta)
    }
}

const def = (src, def) => {
  return {...src, ...def}
}

const renderBody = (match, lineMeta) => {
  const { timestamp, filename, linenumber, body } = lineMeta
  return `[${chalk.gray(timestamp)}][${chalk.white(filename)}:${chalk.gray(linenumber)}]`;
}

const renderCursed = (match, lineMeta) => {
  console.log(`${renderBody(match, lineMeta)} ${chalk.red(lineMeta.body)}`);
}

const renderCursedMessage = (match, lineMeta) => {
  return `${renderBody(match, lineMeta)} ${chalk.blue(lineMeta.body)}`;
}

const renderStarkeeper = (match, lineMeta) => {
  return `${renderBody(match, lineMeta)}  ${chalk.yellow(lineMeta.body)}`;
}

const triggerMatch = (expr, lineMeta, render) => {
  let triggerText = ''
  if (!lineMeta.body) {
    triggerText = lineMeta.src
  } else {
    triggerText = lineMeta.body
  }
  const matches = takeMatches(expr, lineMeta, triggerText)
  if (matches) {
    const renderedLine = render(matches, lineMeta)
    console.log(renderedLine);
  }
  return false;
}

const StarkeeperTriggers = (lineMeta) => {
  if (triggerMatch(/^.*CURSED.*$/, lineMeta, renderStarkeeper)) return
  if (triggerMatch(/^.*STARKEEPER.*$/, lineMeta, renderStarkeeper)) return
  if (triggerMatch(/^.*cursed.*$/, lineMeta, renderCursedMessage)) return
  if (triggerMatch(/^.*Script error.*$/, lineMeta, renderCursed)) return
  if (triggerMatch(/^.*error.*$/, lineMeta, renderCursed)) return

  // match = /^.*Undefined event target.*$/.exec(lineMeta.subjects.body)
  // if (triggerMatch(match, lineMeta, renderCursed)) {
  //   return
  // }

  // match = /^.*Error.*$/.exec(lineMeta.subjects.body)
  // if (triggerMatch(match, lineMeta, renderCursed)) {
  //   return
  // }

  // match = /^.*ERROR.*$/.exec(lineMeta.subjects.body)
  // if (triggerMatch(match, lineMeta, renderCursed)) {
  //   return
  // }

}

// conf.events.on('line-continued',    StarkeeperTriggers)
// conf.events.on('line-incomplete',   StarkeeperTriggers)
// conf.events.on('line-begin',        StarkeeperTriggers)

conf.events.on('stellaris-line',    StellarisBodyParser)
conf.events.on('line-complete',     StarkeeperTriggers)



      // if (lines.length > 1000) {
      //   lines = lines.slice(0, 500)
      // }
      // lines.push(line)
      // if (
      //     line.toUpperCase().indexOf("ERROR") !== -1
      // ) {
      //     const index = lines.length - 1
      //     console.error("........> " + lines[index -9])
      //     console.error("........> " + lines[index -8])
      //     console.error("........> " + lines[index -7])
      //     console.error("........> " + lines[index -6])
      //     console.error("........> " + lines[index -5])
      //     console.error("........> " + lines[index -4])
      //     console.error("........> " + lines[index -3])
      //     console.error("........> " + lines[index -2])
      //     console.error("........> " + lines[index -1])
      //     console.error("ERROR:::> " + line)
      //     lastErr = index
      //   }
      // if (
      //     line.toUpperCase().indexOf("CURSE") !== -1
      // ) {
      //     const index = lines.length - 1
      //     console.warn("........> " + lines[index -9])
      //     console.warn("........> " + lines[index -8])
      //     console.warn("........> " + lines[index -7])
      //     console.warn("........> " + lines[index -6])
      //     console.warn("........> " + lines[index -5])
      //     console.warn("........> " + lines[index -4])
      //     console.warn("........> " + lines[index -3])
      //     console.warn("........> " + lines[index -2])
      //     console.warn("........> " + lines[index -1])
      //     console.warn("CRSD::::> " + line)
      //     lastErr = index
      //   }
