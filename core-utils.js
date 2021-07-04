import fs from 'fs';
import path from 'path';

export const getFiles = (rootDir) => {
    const results = []
    const files = fs.readdirSync(rootDir);
    for (const file of files) {
        results.push({file, filePath: path.join(rootDir, file), directory: rootDir})
    }
    return results;
}

export const getMostRecentFile = (rootDir) => {
    const files = getFiles(rootDir);
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


export const MkDir = (rootDirectory, filePath, ignoreErrors) => {
    let dirPath = rootDirectory;
    try {
        if (filePath !== undefined) {
            dirPath = path.join(rootDirectory, filePath);
        }
        if (ignoreErrors) {
            if (fs.existsSync(dirPath)) {
                return;
            }
        }
        fs.mkdirSync(dirPath);
        return dirPath;
    } catch (error) {
        if (ignoreErrors) {
            console.warn(`WARNING: Error creating ${dirPath} (bypass OK)`);
        } else {
            AbortException(`Failed to make directory: ${path}`, error);
        }
    }
}

const MkSym = (from, to, type, ignoreErrors) => {
    try {
        if (ignoreErrors) {
            if (fs.existsSync(to)) {
                return;
            }
        }
        fs.symlinkSync(from, path.normalize(to), type);
    } catch (error) {
        if (!ignoreErrors) {
            AbortException(`Failed to make Symlink: ${from} to ${to} of type ${type}`, error);
        } else {
            console.warn(`WARNING: error creating symlink error: ${error.message} from ${from} to ${to} of type ${type}`);
        }
    }
}