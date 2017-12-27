var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/page.wizard.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
        pathinfo: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        "browsers": ["last 2 versions", "safari >= 7"]
                                    },
                                    modules: false
                                }
                            ]
                        ],
                        plugins: ['transform-helper']
                    }
                }
            }
        ]
    },
    devtool: 'source-map'
};