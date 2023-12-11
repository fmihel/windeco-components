const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const { exit } = require('process');

const PORT = 3002;
//------------------------------------------------------------------------
// получить переменную командной строки
const arg = (name) => process.argv.find((a) => ((a === name) || (a === (`--${name}`)))) !== undefined;
//------------------------------------------------------------------------
// генерация ключа (для CSS)
const genHash = (count) => {
    let res = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < count; i++) res += possible.charAt(Math.floor(Math.random() * possible.length));
    return res;
};
//------------------------------------------------------------------------
const mode = arg('prod') ? 'production' : 'development';
const docker = !!arg('docker'); // запуск из под docker

//------------------------------------------------------------------------
const writeStream = fs.createWriteStream('webpack.php');
writeStream.write(`<?php $webpack=['docker'=>${docker ? 'true' : 'false'}];`);
writeStream.end();
//------------------------------------------------------------------------

const extractCss = false;
//------------------------------------------------------------------------
console.log('--------------------------------------');
console.log('build use      ', (docker ? 'docker' : 'npm'));
if (mode === 'development') console.log('app            ', `http://localhost:${PORT}`);
console.log('mode           ', mode);
console.log('--------------------------------------');

const outputPath = path.resolve(__dirname, 'dist');
const hash = genHash(20);

const copyList = [
    { from: './dev5/media/favicon.ico' },
    { from: './dev5/media/', to: './media/' },
];

const babelSettings = {
    extends: path.join(__dirname, './.babelrc'),
};

let rulesCss = {};
if (extractCss) {
    rulesCss = {
        ...rulesCss,
        type: 'asset/resource',
        generator: {
            // filename(o){ console.log('style',Object.keys(o),o.filename.replaceAll('/','_')); return "style/[path]/[name]."+hash+".css";}
            filename: `style/[path]/[name].${hash}.css`,
        },
        use: [
            'sass-loader', // inject CSS to page
        ],
    };
} else {
    rulesCss = {
        ...rulesCss,
        use: [
            'style-loader', // inject CSS to page
            'css-loader', // translates CSS into CommonJS modules
            'sass-loader', // compiles SASS to CSS
        ],
    };
}

module.exports = {
    entry: {
        main: './dev5/index.js',
        // style:'./app/style.scss'
    },
    output: {
        path: outputPath,
        filename: '[name].[fullhash].js',
        chunkFilename: 'lazy/[id].[chunkhash].js',
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: PORT,
        // liveReload: true,
    },
    resolve: {
        alias: {
            // COMPONENTS: path.resolve(__dirname, app_client+'components/'),
            REDUX: path.resolve(__dirname, 'dev5/redux/'),
        },
    },
    mode,
    devtool: (mode === 'development' ? 'inline-source-map' : undefined),
    plugins: [
        // new MiniCssExtractPlugin(),
        // new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // }),
        new webpack.DefinePlugin({
            CSS_ROOT_PATH: JSON.stringify('./style/client/'),
            CSS_HASH: JSON.stringify(hash),
            CSS_LAZY_LOAD_ENABLE: extractCss,
            WEBPACK_MODE: JSON.stringify(mode),
        }),
        new HtmlWebPackPlugin({
            template: './dev5/index.html',
            filename: './index.html',
        }),
        new CopyWebpackPlugin({ patterns: copyList }),
        // new webpack.HotModuleReplace`mentPlugin()
    ],
    module: {
        rules: [

            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                ...rulesCss,
            },
            /*
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            */
            {
                test: /\.jsx$/,
                // exclude: /node_modules/,
                // include: [
                //    path.resolve(__dirname, "./client"),
                //    path.resolve(__dirname, "./node_modules")
                // ],
                use: [`babel-loader?${JSON.stringify(babelSettings)}`],
                // use: {
                //    loader: 'babel-loader',
                // },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // {
            //    test: /\.css$/,
            //    use: [MiniCssExtractPlugin.loader, 'css-loader'],
            // },
        ],
    },
    stats: {
        loggingDebug: ['sass-loader'], // enabled sass @debug output
    },
    optimization: {
        minimizer: (mode === 'production') ? [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            '...',
            new CssMinimizerPlugin(),

        ] : [],
    },

};
