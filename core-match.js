import { conf } from './core-conf.js'
import { EncodeJSON } from "./core-utils.js"

export const takeMatches = (expression, meta, lineFragment) => {
    const matches = expression.exec(lineFragment.trim());
    if (matches !== null) {
        for (const namedCaptureGroup of Object.keys(matches.groups)) {
            if (!meta.subjects) meta.subjects = {}
            meta.subjects[namedCaptureGroup] = matches.groups[namedCaptureGroup]
        }
        return true
    }
}
