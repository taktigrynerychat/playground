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
            path: `${dir}/${subDir}`
        }))
        return Promise.resolve([...(await acc), ...res])
    }, Promise.resolve([]))


    const config = `// Auto-generated file
export const patterns: Patterns = {${directoriesMetadata.reduce((acc, {name, path}) => `${acc}
  '${name}': {
    dynamicImport: () => import('./${path}')
  },`, '')}
}`;
    const configPath = join(__dirname, 'config.ts');
    let previousConfig

    try {
        previousConfig = readFileSync(configPath, { encoding: 'utf8' })
    } catch (e) {}

    previousConfig !== config && await writeFile(configPath, config)
}