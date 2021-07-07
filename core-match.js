import { conf } from './core-conf.js'
import { EncodeJSON } from "./core-utils.js"

export const takeMatches = (expression, meta, lineFragment) => {
  if (lineFragment === null || lineFragment === undefined) {
      debugger
    }
    const matches = expression.exec(lineFragment.trim());
    if (matches) {
      if (matches.groups) {
        for (const namedCaptureGroup of Object.keys(matches.groups)) {
          meta[namedCaptureGroup] = matches.groups[namedCaptureGroup]
        }
      }
      return matches.length
    }
    return 0
}
