
import { conf } from './core-conf.js'
import { logInfo } from './core-utils.js'
import child_process from 'child_process'
import path from 'path'
import { logWarn, EncodeJSON } from './core-utils.js'


const imageMagicMeta = (imageMagickOutput) => {
  const matches = /^.*==>(?<fileName>.*\..*) (?<fileType>.*) (?<dimensions>\d*x\d*) (?<details>.*$)/.execute(imageMagickOutput)
  if (matches.length > 1) {
    return matches.groups();
  } else {
    logWarn(`Didn't recognize imagemagick output: ${imageMagickOutput} matches: ${EncodeJSON(matches)}`)
  }
}

export const imageMagickConvert = (convertArgs) => {
  // execute the imagemagick command and throw on error
  const cmd = `${conf.imageMagickConvert} ${convertArgs.join(' ')}`
  const output = child_process.execSync(cmd, {
      cwd: process.cwd(),
      stdio: [0, 1, 2]
  });
}


export const  makePng = (inputPath, nameTag = 'starkeeper', resizePct = 200, outputRoot) => {
    const inFileType = path.extname(inputPath)
    const inFileName = path.basename(inputPath)
    const outFileBase = path.basename(inFileName, inFileType)
    const outFileName = `${outFileBase}-${resizePct}-${nameTag}.png`
    const outputFile = outputRoot
                ? path.join(outputRoot, outFileName)
                : path.join(path.dirname(inFileName), outFileName)
    logInfo(`makePng: ${inputPath} => ${outputFile}`)
    const command = [inFileName, '-verbose', '-resize', `${resizePct}%`, outputFile]
    imageMagickConvert(command)
    return outFileName
}
