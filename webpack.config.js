const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path : path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                // exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', '@babel/preset-react'
                        ]
                    }
                }
            }
        ],
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
};