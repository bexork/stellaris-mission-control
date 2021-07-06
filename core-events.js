import { conf } from './core-conf.js'
import { takeMatches } from './core-match.js'

export const startRule = (rule) => {
    conf.events.on('stellaris-log-end', (lineMeta) => {
        if (takeMatches(rule.expr, lineMeta, lineMeta.body)) {
            conf.events.emit('stellaris-error', { trigger: rule, lineMeta: lineMeta})
        }
    });
}
