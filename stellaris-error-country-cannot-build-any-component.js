// [15:04:56][component.cpp:483]: Country Tranquil Luganid Syndicate cannot build any component in the component set thruster_components for design Temp fe_ships_goliath
// [15:04:56][component.cpp:483]: Country Tranquil Luganid Syndicate cannot build any component in the component set combat_computers for design Temp fe_ships_goliath
// [15:04:56][component.cpp:483]: Country Tranquil Luganid Syndicate cannot build any component in the component set power_core for design Temp fe_ships_small_station
// [15:04:56][component.cpp:483]: Country Tranquil Luganid Syndicate cannot build any component in the component set power_core for design Temp fe_ships_large_station
// [15:04:56][component.cpp:483]: Country Tranquil Luganid Syndicate cannot build any component in the component set power_core for design Temp RA Battleship I


import { conf } from './stellaris-conf.js'
import { takeMatches } from './core-match.js'
import { emitError } from './core-events.js'

const expr = /^Country (?<country_name>.*) cannot build any component in the component set (?<component_set_name>.*) for design (?<design_name>.*)$/
emitErrorOnExpression(expr)
