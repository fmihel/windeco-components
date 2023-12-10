const path = require('path');

//const {defArg} = require('fmihel-server-lib');

let remotePath = false;
const toRemotePath = '';
//const toProduction = !toRemotePath && defArg('prod');
const toProduction = true;


module.exports = {
  mode: toProduction?'production':'development',
  devtool: toProduction?undefined:'inline-source-map',
  entry: {
    'windeco-components':'./jsx/index.js',
  },
  output: {
    path: toRemotePath?remotePath:path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    //filename: 'windeco-components-[name]'+((toProduction||toRemotePath)?'.min':'')+'.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  externals: {      
    // Don't bundle react or react-dom      
    react: {          
        commonjs: "react",          
        commonjs2: "react",          
        amd: "React",          
        root: "React"      
    },      
    "react-dom": {          
        commonjs: "react-dom",          
        commonjs2: "react-dom",          
        amd: "ReactDOM",          
        root: "ReactDOM"      
    },
    "fmihel-browser-lib":"fmihel-browser-lib",
    "jquery":'jquery',
    "lodash":"lodash"
  },    
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'jsx'),
        exclude: /(node_modules|bower_components|build|dev)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],          
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: [
            {
                loader: 'style-loader', // inject CSS to page
            },{
                loader: 'css-loader', // translates CSS into CommonJS modules
            },{
                loader: 'postcss-loader', // Run post css actions
                options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                    }
                }
            },{
                loader: 'sass-loader' // compiles SASS to CSS
            }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },        
    ]
  },
}