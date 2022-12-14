const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { defArg } = require('fmihel-server-lib');
// const ReplaceBefore = require('webpack-plugin-replace');
const ReplaceAfter = require('replace-in-file-webpack-plugin');
/*
 webpack.local must consists path for run app:
 Ex:
 module.exports = {
    PHP_ROUTER_ADDR: 'http://work/fmihel/config-php-app/app/server/',
};
 */

const PORT = 3000;
const isDevelopment = defArg('dev');
const includeDebugInfo = defArg('idi');

// Папка к клиентской части приложения (исходники js)
const SOURCE_PATH = './dev-bs/';
// Папка для конечной сборки
const PUBLIC_PATH = isDevelopment ? './public/' : './dist/';
// Папка с шаблонами (index.html)
const TEMPLATE_PATH = `${SOURCE_PATH}/`;
// Папка с медиа файлами
const MEDIA_PATH = `${SOURCE_PATH}media/`;

// установка базового пути для react-router и загрузочной страницы index.html
const BASEPATH_HTML = isDevelopment ? '' : '/dist/';

const CopyWebpackPluginList = [
    { from: `${MEDIA_PATH}favicon.ico` },
];

const plugins = [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // webpack: path.resolve(path.join(__dirname, 'app/client/webpack.define')),
    }),
    new HtmlWebPackPlugin({
        template: `${TEMPLATE_PATH}index.html`,
    }),
    new CopyWebpackPlugin(CopyWebpackPluginList),
];

const replaceAfterRules = [];

if (!isDevelopment) {
    replaceAfterRules.push(
        {
            dir: PUBLIC_PATH.substring(2),
            files: ['index.html'],
            rules: [{
                search: '<base href=""/>',
                replace: `<base href="${BASEPATH_HTML}"/>`,
            }],
        },

    );
}

plugins.push(new ReplaceAfter(replaceAfterRules));

module.exports = {
    mode: (isDevelopment || includeDebugInfo ? 'development' : 'production'),
    devtool: (isDevelopment || includeDebugInfo ? 'inline-source-map' : ''),
    devServer: {
        contentBase: PUBLIC_PATH,
        port: PORT,
        liveReload: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    entry: `${SOURCE_PATH}index.js`,
    output: {
        path: path.resolve(__dirname, PUBLIC_PATH),
        filename: '[name].[hash].js',
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
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins,

};
