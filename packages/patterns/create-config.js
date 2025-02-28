const {readdir, writeFile} = require("fs/promises");
const {statSync, readFileSync} = require("fs");
const {join} = require("path");

const isDir = (filePath) => statSync(filePath).isDirectory();
const { EXECUTE_PATTERN } = process.env;

function getConfigData(directoriesMetadata) {
    return `// Auto-generated file
export const PATTERNS_METADATA: PatternsMetadata = {${Object.entries(directoriesMetadata).reduce((acc, [group, patterns]) => `${acc}
\t'${group}': {${patterns.reduce((pAcc, {name, path, content}) => `${pAcc}
\t\t'${name}': {
\t\t\tdynamicImport: () => import('./${path}'),${EXECUTE_PATTERN === name ? '\n\t\t\texecuteByDefault: true,' : ''}
\t\t\tcontent: '${content}',
\t\t},`, '')}
\t},`, '')}
};`;
}

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
                .replace(/['"`$\\]/g, "\\$&")
                .replace(/\r/g, '\\r')
                .replace(/\n/g, '\\n')
        }))
        return Promise.resolve({...(await acc), [dir]: res})
    }, Promise.resolve({}))

    const configData = getConfigData(directoriesMetadata);
    const configPath = join(__dirname, 'config.ts');
    let previousConfigData;

    try {
        previousConfigData = readFileSync(configPath, { encoding: 'utf8' });
    } catch (e) {}

    previousConfigData !== configData && await writeFile(configPath, configData);
}