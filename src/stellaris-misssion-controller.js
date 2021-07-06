import { conf } from './core-conf.js'
import { BasicMissionHandler } from './stellaris-basic-mission-handler.js'


let MH = new BasicMissionHandler()
conf.events.on('stellaris-start', MH.Start)
conf.events.on('stellaris-error', MH.Error)
conf.events.on('stellaris-crashed', MH.Crashed)
conf.events.on('stellaris-exited', MH.End)


export const setMissionHandler = (newMissionHandler) => {
    missionHandler = newMissionHandler
}