const { composePlugins, withNx } = require('@nx/webpack');
const createConfigCallback = require("./create-config");
require('dotenv-flow').config({ path: __dirname });

class BeforeRunWebpackPlugin {
    constructor(cb) {
        this.cb = cb;
    }

    apply(compiler) {
        this.cb && compiler.hooks.compile.tap("beforeRunWebpackPlugin", this.cb);
    }
}

module.exports = composePlugins(
    withNx(),
    (config) => {
        config.plugins.push(
            new BeforeRunWebpackPlugin(createConfigCallback),
        )
        return config;
    }
);
