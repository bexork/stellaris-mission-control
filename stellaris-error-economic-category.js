// [14:38:54][economic_category.cpp:631]: Economic Category: planet_infrastructure. Generated 'mult' modifiers for table 'upkeep' is never used from script.
// phase: load


import { conf } from './stellaris-conf.js'
import { takeMatches } from './core-match.js'
import { conf } from './stellaris-conf.js'
import { takeMatches } from './core-match.js'

const expr = /^Economic Category: (?<economic_category>.*). Generated 'mult' modifiers for table (?<table_name>.*) is never used from script.$/
emitErrorOnExpression(expr)
