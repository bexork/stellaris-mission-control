import { conf } from './stellaris-conf.js'
import { takeMatches } from './core-match.js'

export const emitErrorOnExpression = (lineMeta) => {
    conf.events.on('stellaris-log-end', (lineMeta) => {
        if (takeMatches(expr, lineMeta, lineMeta.body)) {
            conf.events.emit('stellaris-error', lineMeta)
        }
    });
}
