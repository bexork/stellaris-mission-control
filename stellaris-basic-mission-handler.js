export class BasicMissionHandler  {

    constructor() {
    }

    Start = (lineMeta) => {
        console.log(EncodeJSON(lineMeta))
    }
    
    Error = (lineMeta) => {
        console.error(EncodeJSON(lineMeta))
        //postSuspects(lineMeta)
    }
    
    Crashed = (lineMeta) => {
        console.error(EncodeJSON(lineMeta))
    }
    
    End = (lineMeta) => {
        // summarize analysis of logs and post to storage
        console.log(EncodeJSON(lineMeta))
    }
}
