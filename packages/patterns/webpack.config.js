const { composePlugins, withNx } = require('@nx/webpack');
const createConfigCallback = require("./create-config");
const Dotenv = require('dotenv-webpack');
const { resolve } = require('path');

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
        const path = resolve(__dirname, '.env');

        config.plugins.push(
            new BeforeRunWebpackPlugin(createConfigCallback),
            new Dotenv({
                path,
                allowEmptyValues: true,
            }),
        )
        return config;
    }
);
