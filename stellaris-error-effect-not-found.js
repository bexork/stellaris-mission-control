// [14:38:53][effect_impl.cpp:7712]: Error in change_pc effect, Could not find planet or randomlist with key: pc_ammonia file:  file:  file: events/00_emo_eldest_sibling_event.txt line: 23 line: 1 line: 1
// phase: load


import { emitErrorOnExpression } from './core-match.js'

const expr = /^Error in (?<effect_name>.*) effect, Could not find planet or randomlist with key: (?<missing_key_name>.*) .* file\: (?<file>.*)$/
emitErrorOnExpression(expr)
