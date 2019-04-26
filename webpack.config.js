/* global require __dirname module */
const path = require('path')

const conf = {
    entry: './dev/lesson07/index.js',
    
    output: {
        path: path.resolve(__dirname, './js'),
        filename: 'main.js',
        publicPath: 'js/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: '/node_modules/'
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
