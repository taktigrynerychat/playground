const {readdir, writeFile} = require("fs/promises");
const {statSync, readFileSync} = require("fs");
const {join} = require("path");

const isDir = (filePath) => statSync(filePath).isDirectory();

module.exports = async () => {
    const files = await readdir(__dirname);

    const dirs = files.reduce((acc, dir) => {
        const dirPath = join(__dirname, dir);
        return isDir(dirPath) ? [...acc, {dir, dirPath}] : acc;
    }, []);


    const directoriesMetadata = await dirs.reduce(async (acc, {dir, dirPath}) => {
        const subDirs = await readdir(dirPath)
        const res = subDirs.map(subDir => ({
            name: subDir,
            path: `${dir}/${subDir}`,
            content: readFileSync(join(dirPath, subDir, 'index.ts'), {encoding: "utf-8"})
        }))
        return Promise.resolve({...(await acc), [dir]: res})
    }, Promise.resolve({}))

    const configData = `// Auto-generated file
export const PATTERNS_METADATA: PatternsMetadata = {${Object.entries(directoriesMetadata).reduce((acc, [group, patterns]) => {
    return `${acc}
  '${group}': {${patterns.reduce((pAcc, {name, path, content}) => `${pAcc}
    '${name}': {
      dynamicImport: () => import('./${path}'),
      content: '${content.replace(/['"`$\\]/g, "\\$&").replace(/\r/g, '\\r').replace(/\n/g, '\\n')}',
    },`, '')}
  },`}, '')}
}`
    const configPath = join(__dirname, 'config.ts');
    let previousConfigData

    try {
        previousConfigData = readFileSync(configPath, { encoding: 'utf8' })
    } catch (e) {}

    previousConfigData !== configData && await writeFile(configPath, configData)
}

function unbackslash(s) {
    return s.replace(/\\([\\rnt'"])/g, function(match, p1) {
        if (p1 === 'n') return '\n';
        if (p1 === 'r') return '\r';
        if (p1 === 't') return '\t';
        if (p1 === '\\') return '\\';
        return p1;       // unrecognised escape
    });
}