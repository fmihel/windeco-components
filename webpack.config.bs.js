const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const genHash = (count) => {
    let res = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < count; i++) res += possible.charAt(Math.floor(Math.random() * possible.length));
    return res;
};

const SOURCE_PATH = './dev-bs/';
const PUBLIC_PATH = './public/';
const TEMPLATE_PATH = './dev-bs/';
const MEDIA_PATH = './dev-bs/media/';
const PORT = 3002;
const hash = genHash(20);

module.exports = {
    entry: `${SOURCE_PATH}index.js`,
    output: {
        path: path.resolve(__dirname, PUBLIC_PATH),
        filename: '[name].[contenthash].js',
    },
    resolve: {
        alias: {
            REDUX: path.resolve(__dirname, 'dev-bs/redux/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                        options: {
                            url: false,
                        },
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins() { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer'),
                                ];
                            },
                        },
                    }, {
                        loader: 'sass-loader', // compiles SASS to CSS
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: PUBLIC_PATH,
        port: PORT,
        liveReload: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            CSS_HASH: JSON.stringify(hash),
            CSS_LAZY_LOAD_ENABLE: false,
            CSS_ROOT_PATH: JSON.stringify('./style/app/'),

        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new HtmlWebPackPlugin({
            template: `${TEMPLATE_PATH}index.html`,
            filename: './index.html',
        }),
        new CopyWebpackPlugin([
            { from: `${MEDIA_PATH}favicon.ico` },
            { from: `${MEDIA_PATH}`, to: './media/' },
        ]),
    ],
};
