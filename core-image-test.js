import { makePng } from './core-image.js'
import { WriteFile, MkDir } from './core-utils.js'

makePng('C:/Users/bexac/Desktop/Code/starkeeper-mission-control/archaeology_map_icon.dds', 'MONKEY' , 200)

MkDir('.converted', true /** ifNotExists */)

makePng('C:/Users/bexac/Desktop/Code/starkeeper-mission-control/archaeology_map_icon.dds', 'MONKEY' , 200, '.converted')
makePng('C:/Users/bexac/Desktop/Code/starkeeper-mission-control/archaeology_map_icon.dds', 'MOONOO' , 200, 'C:/StellarisIndex.2')

