/* global require __dirname module */
const path = require('path')

const conf = {
    entry: './dev/lesson10/server.js',

    output: {
        path: path.resolve(__dirname, './app'),
        filename: 'server.js',
        publicPath: 'app/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    }
}

module.exports = (env, options) => {
    conf.devtool = options.mode == "production" ?
        false :
        "cheap-module-eval-source-map"

    return conf
}
