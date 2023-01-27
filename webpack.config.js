const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/cardgame.js',
    mode: 'production',
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'static', to: 'static' }],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin(),
    ],
};
