import { conf } from './core-conf.js'
import { takeMatches } from './core-match.js'

// listeners
// import './stellaris-error-country-cannot-build-any-component.js'
// import './stellaris-error-economic-category.js'
// import './stellaris-error-effect-not-found.js'
// import './stellaris-error-failed-to-add-district.js'
// import './stellaris-error-in-trigger-not-found.js'
// import './stellaris-error-invalid-context-switch.js'
// import './stellaris-error-script-error.js'
import './stellaris-body-parser.js'

import { StellarisLogMonitor } from './core-log-tail.js'
import { StellarisLauncher } from './stellaris-launcher.js'

StellarisLogMonitor(conf.documents.logFiles.error)
StellarisLauncher({})
console.log("🚀🚀🚀 Stellaris Mission Control Operations Active 🚀🚀🚀 ")
console.log("🚀🚀🚀 Good Luck and Enjoy the Game! 🚀🚀🚀 ")
