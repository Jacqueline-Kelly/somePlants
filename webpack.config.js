var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: path.join(__dirname, "client/index.jsx"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                }
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpeg|gif)$/i,
                type: 'asset',
            },

        ],
    },
};
