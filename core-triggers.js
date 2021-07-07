// import { startRule } from './core-events.js'
// import { chalk } from 'chalk'
// const chalk = require('chalk');
// const log = console.log;

// // // Combine styled and normal strings
// // log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// // // Compose multiple styles using the chainable API
// // log(chalk.blue.bgRed.bold('Hello world!'));

// // // Pass in multiple arguments
// // log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// // // Nest styles
// // log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// // // Nest styles of the same type even (color, underline, background)
// // log(chalk.green(
// //     'I am a green line ' +
// //     chalk.blue.underline.bold('with a blue substring') +
// //     ' that becomes green again!'
// // ));

// // // ES2015 template literal
// // log(`
// // CPU: ${chalk.red('90%')}
// // RAM: ${chalk.green('40%')}
// // DISK: ${chalk.yellow('70%')}
// // `);

// const triggers = [{
//         category: 'CustomShipDesignError',
//         expr: /^Country (?<country_name>.*) cannot build any component in the component set (?<component_set_name>.*) for design (?<design_name>.*)$/,
//         sev: 2,
//         phase: 'game-start',
//         hits: [],
//     }, {
//         category: 'EconomicCategory',
//         expr: /^Economic Category: (?<economic_category>.*). Generated 'mult' modifiers for table (?<table_name>.*) is never used from script.$/,
//         phase: 'game-start',
//         sev: 2,
//         hits: []
//     },
//     {
//         category: 'EffectError',
//         expr: /^Error in (?<effect_name>.*) effect, Could not find planet or randomlist with key: (?<missing_key_name>.*) .* file\: (?<file>.*)$/,
//         phase: 'game-start',
//         sev: 2,
//         hits: []
//     },
//     {
//         category: 'EffectError, PlanetClassWithKeyMissing',
//         expr: /^Error in (?<trigger_name>.*) trigger, cannot find planet class with key: (?<missing_key_name>.*) .* file\: (?<file>.*)$/,
//         phase: 'game-start',
//         sev: 2,
//         hits: []
//     },
//     {
//         category: 'FailedToAddDistrict',
//         expr: /^Failed to add district (?<district_type>.*) to planet , (?<planet_name>.*) at  file: (?<file>.*)$/,
//         phase: 'game-start',
//         sev: 2,
//         hits: []
//     },
//     {
//         category: 'FailedToAddDistrict',
//         expr: /.*<cursed>[cursed|cursed_|Cursed_|CURSE].*/,
//         phase: 'any',
//         sev: 1,
//         hits: [],
//         render: (rule, lineMeta) = {
//           log(chalk.blue.bgRed.bold(lineMeta.body))
//         }
//     }
// ]

// for(const trigger of triggers) {
//     startRule(trigger)
// }
