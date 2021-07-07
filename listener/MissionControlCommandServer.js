import { AbortError } from '../core-utils';

const server = import('./bin/wwww')

// register event listener for mission-control-ready app.
// Then start listening for commands on the command channel
// save the commands in list
// give them to clients when they check in and throw the commands away

export class MissionControlCommandServer {
  constructor() {
    this.commands = []
  }

  AddCommand(command) {
    this.commands.push(command);
  }

  Start() {
    server.MissionControlServerMain({
      nextCommand: (request) => {
        // only use request to find out who it is.
        // at this point we do not care, just send back all the commands.
        if (this.commands.length > 0) {
          return this.commands.shift();
        } else {
          return {}
        }
      }
    });
  }
}

export class MissionControlCommandClient {
  constructor(options) {
    if (!options.ObeyCommand) {
      AbortError('You must provide the means to obey the commands! ObeyCommand missing from options.')
    }
    if (!options.MissionControllerUrl) {
      AbortError('You must provide the URL of options.MissionControllerUrl!')
    }

    this.options = options;
  }

  async Start() {
    while (true) {
      const command = await fetch(options.MissionControllerUrl)
      this.options.ObeyCommand(command)
    }
  }

}


