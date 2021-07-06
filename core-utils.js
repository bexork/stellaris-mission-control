import fs from 'fs'
import path from 'path'


export const logError = (message, ...args) => {
    console.error(`ERROR: ${message}`, ...args)
}

export const logWarn = (message, ...args) => {
    console.warn(`WARNING: ${message}`, ...args)
}

export const logInfo = (message, ...args) => {
    console.info(`INFO: ${message}`, ...args)
}

export const logDebug = (message, ...args) => {
    console.debug(`DEBUG: ${message}`, ...args)
}

export const logVerbose = (message, ...args) => {
    // console.log(`VERBOSE: ${message}`, ...args)
}

export const logTrace = (message, ...args) => {
    console.trace(`TRACE: ${message}`, ...args)
}

export const EmptyDirectory = (path) => {
    if (!fs.existsSync(path)) return true;
    const files = fs.readdirSync(path);
    return (files.length === 0);
}

export const CleanFileSystemName = (str) => {
    return str.replace(/[\\/:*?\"<>|]/g, '').substring(0, 240)
}

export const Unquoted = (str) => {
    return str.replace(/^(")(.*)(")$/g, '$2')
}

export const Exists = (pathRoot, pathName) => {
    if (pathName !== undefined) {
        return fs.existsSync(path.join(pathRoot, pathName));
    } else {
        return fs.existsSync(pathRoot);
    }
}

export const getFiles = (rootDir, pathFragment = undefined) => {
    const results  = []
    const fullRoot = path.join(rootDir, pathFragment !== undefined ? pathFragment : '')
    const files    = fs.readdirSync(fullRoot);
    for (const file of files) {
        results.push({
            file,
            filePath: path.join(fullRoot, file),
            directory: fullRoot
        })
    }
    return results;
}

export const getFileSystemType = (rootPath) => {
    const stat = fs.statSync(rootPath)
    if (stat.isDirectory(rootPath))       { return 'dir' }
    if (stat.isFile(rootPath))            { return 'file' }
    if (stat.isSymbolicLink(rootPath))    { return 'sym' }
    throw new Error('Unacceptable FileSystemType encountered when scrounging through the file system')
}

export const getMostRecentFile = (rootDir, inFiles) => {
    const files = !inFiles ? getFiles(rootDir) : inFiles;
    let maxmtime = 0;
    let maxFile;

    for (const file of files) {
        const stats = fs.statSync(file.filePath);
        if (stats.mtime > maxmtime) {
            maxmtime = stats.mtime;
            maxFile = file;
        }
    }
    return maxFile.filePath;
}

export const DeleteChildDirs = (root) => {
    // try {
    //     let files = getFiles(root)
    //     for (const f of files) {

    //     }            
    // } catch (err) {
    //     AbortException(`Failed to DeleteChildDirs ${root} because ${err.message}`)
    // }
}

export const AbortError = (message) => {
    console.error(`ERROR: ABORTING EXECUTION because ${message}`)
    process.exit(1);
}

export const AbortException = (message, exception) => {
    console.error(`ERROR: ${message} because ${exception}`);
    if (exception.message) {
        console.error(`ERROR: ${exception.message}`);

    }
    if (exception.stack) {
        console.error(`ERROR: ${exception.stack}`);
    }
    process.exit(1);
}

export const WriteJSON = (root, file, object) => {
    try {
        fs.writeFileSync(path.join(root, file), EncodeJSON(object), 'utf8');
    } catch (exception) {
        AbortException(`Failed to write ${file}`, exception);
    }
}

export const EncodeJSON = (object) => {
    return JSON.stringify(object, null, 2);
}

export const LoadJSON = (root, file, defaultValues) => {
    try {
        const jsonPath = path.join(root, file);
        if (fs.existsSync(jsonPath)) {
            return JSON.parse(fs.readFileSync(jsonPath, 'utf8').toString());
        } else {
            return defaultValues;
        }
    } catch (exception) {
        AbortException(`Failed to read ${file}`, exception);
    }
}

export const MkDir = (rootDirectory, ifNotExists) => {
    try {
        if (ifNotExists) {
            if (fs.existsSync(rootDirectory)) {
                return;
            }
        }
        fs.mkdirSync(rootDirectory);
        return rootDirectory;
    } catch (error) {
        AbortException(`Failed to make directory: ${path}`, error);
    }
}

export const MkDirPaths = (rootDirectory, filePath, ifNotExists) => {
    let dirPath = rootDirectory;
    try {
        if (filePath !== undefined) {
            dirPath = path.join(rootDirectory, filePath);
        }
        if (ifNotExists) {
            if (fs.existsSync(dirPath)) {
                return dirPath;
            }
        }
        fs.mkdirSync(dirPath);
        return dirPath;
    } catch (error) {
        if (ifNotExists) {
            console.warn(`WARNING: Error creating ${dirPath} (bypass OK)`);
        } else {
            AbortException(`Failed to make directory: ${path}`, error);
        }
    }
}

export const MkSym = (from, to, type, ifNotExists) => {
    try {
        if (ifNotExists) {
            if (fs.existsSync(to)) {
                logWarn(`Not making symbolic link because it exists: ${to} `)
                return;
            }
        }
        fs.symlinkSync(from, path.normalize(to), type);
    } catch (error) {
        if (!ifNotExists) {
            AbortException(`Failed to make Symlink: ${from} to ${to} of type ${type}`, error);
        } else {
            console.warn(`WARNING: error creating symlink error: ${error.message} from ${from} to ${to} of type ${type}`);
        }
    }
}