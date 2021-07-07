import { conf } from './core-conf.js'
import { takeMatches } from './core-match.js'

export const triggerError = (rule) => {
    conf.events.on('stellaris-log-complete', (lineMeta) => {
        if (takeMatches(rule.expr, lineMeta, lineMeta.body)) {
            conf.events.emit('stellaris-error', { trigger: rule, lineMeta: lineMeta})
        }
    });
}
