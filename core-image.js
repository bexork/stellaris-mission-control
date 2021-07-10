
import { conf } from './core-conf.js'
import { Exists, logInfo } from './core-utils.js'
import child_process from 'child_process'
import path from 'path'
import { logWarn, EncodeJSON, AbortError } from './core-utils.js'
import process from 'process'

const magickCache = {}

const imageMagicMeta = (imageMagickOutput) => {
  const matches = /^(?<fileName>.*) (?<fileType>.*) (?<dimensions>\d+x\d+) (?<details>.*$)/.exec(imageMagickOutput)
  if (matches && matches.length > 1) {
    return matches.groups()
  } else {
    logWarn(`Didn't recognize imagemagick output: ${imageMagickOutput}`)
    return {
      rawImageMagickOutput: imageMagickOutput
    }
  }
}

export const imageMagickConvert = (inputFile, outputFile, convertArgs) => {
  // execute the imagemagick command or throw on error
  if (!conf.imageMagickHome) {
    AbortError('Mission Abort!!! ImageMagick not configured in .mission-control.yaml. expected imageMagickHome')
  }
  if (!Exists(inputFile)) {
    AbortError('Mission Abort!!! Source file does not exist!')
  }
  if (magickCache[inputFile]) {
    return magickCache[inputFile]
  }

  const cacheMeta = {
    inputFile,
    outputFile,
    convertArgs
  }

  const identifyCmd = `${conf.imageMagickHome}/magick identify "${inputFile}" -verbose `
  cacheMeta.inputIdentify = child_process.execSync(identifyCmd, {
    cwd: process.cwd(),
    stdio: [0, 1, 2]
  })

  const convertCmd = `${conf.imageMagickHome}/magick convert "${inputFile}" -verbose ${convertArgs.join(' ')} "${outputFile}"`
  cacheMeta.convertCmd = child_process.execSync(convertCmd, {
    cwd: process.cwd(),
    stdio: [0, 1, 2]
  })

  magickCache[inputFile] = cacheMeta
}

export const makePng = (inputPath, nameTag = 'starkeeper', resizePct = 200, outputRoot) => {
  if (outputRoot.indexOf('/flags/') !== -1) return

  const inFileType = path.extname(inputPath)
  const inFileName = path.basename(inputPath)
  const outFileBase = path.basename(inFileName, inFileType)
  const outFileName = `${outFileBase}-${resizePct}-${nameTag}.png`
  const outputFile = outputRoot
    ? path.join(outputRoot, outFileName)
    : path.join(path.dirname(inFileName), outFileName)
  logInfo(`makePng: ${inputPath} => ${outputFile}`)
  imageMagickConvert(inputPath, outputFile, ['-resize', `${resizePct}%`])
  return outFileName
}
