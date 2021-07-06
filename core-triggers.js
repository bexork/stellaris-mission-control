import { startRule } from './core-events.js'

const triggers = [{
        category: 'CustomShipDesignError',
        expr: /^Country (?<country_name>.*) cannot build any component in the component set (?<component_set_name>.*) for design (?<design_name>.*)$/,
        sev: 2,
        phase: 'game-start',
        hits: [],
    }, {
        category: 'EconomicCategory',
        expr: /^Economic Category: (?<economic_category>.*). Generated 'mult' modifiers for table (?<table_name>.*) is never used from script.$/,
        phase: 'game-start',
        sev: 2,
        hits: []
    },
    {
        category: 'EffectError',
        expr: /^Error in (?<effect_name>.*) effect, Could not find planet or randomlist with key: (?<missing_key_name>.*) .* file\: (?<file>.*)$/,
        phase: 'game-start',
        sev: 2,
        hits: []
    },
    {
        category: 'EffectError, PlanetClassWithKeyMissing',
        expr: /^Error in (?<trigger_name>.*) trigger, cannot find planet class with key: (?<missing_key_name>.*) .* file\: (?<file>.*)$/,
        phase: 'game-start',
        sev: 2,
        hits: []
    },
    {
        category: 'FailedToAddDistrict',
        expr: /^Failed to add district (?<district_type>.*) to planet , (?<planet_name>.*) at  file: (?<file>.*)$/,
        phase: 'game-start',
        sev: 2,
        hits: []
    },
    {
        category: 'FailedToAddDistrict',
        expr: /.*[cursed|cursed_|Cursed_|CURSE].*/,
        phase: 'any',
        sev: 1,
        hits: []
    }

]

for(const trigger of triggers) {
    startRule(trigger)
}