var _ = require('underscore');
var path = require('path');
var webpack = require('webpack');
var config = require('./config');
var StatsPlugin = require('stats-webpack-plugin');

var devEntry = _.reduce(config.entry,function(entries,v,k){
  entries[k] = ['webpack-dev-server/client?'+config.previewUrl, 'webpack/hot/dev-server', v];
  return entries;
},{});

var devOutput = _.extend({},config.output,{publicPath: config.previewUrl+config.assetsFolder+'/'});

module.exports = {
  development:{
   browser: {
      name     : 'browser',
      devtool  : 'eval-source-map',
      devServer: true,
      entry    : devEntry,
      output   : devOutput,
      resolve  : {extensions: config.extensions},
      module   : {loaders: config.loaders},
      plugins: config.plugins.concat([
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('development')
          }
        }),
        new StatsPlugin(path.join(__dirname, 'stats.json'), {
          chunkModules: true,
          profile: true,
          exclude: [/node_modules[\\\/]react/]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ])
    }
  },
  production:{
    browser: {
      name    : 'browser',
      entry   : config.entry,
      output  : config.output,
      resolve : {extensions: config.extensions},
      module  : {loaders: config.loaders},
      plugins : config.plugins.concat([
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new StatsPlugin(path.join(__dirname, 'stats.json'), {
          chunkModules: true,
          profile: true
        }),
        new webpack.optimize.UglifyJsPlugin({ output: {
          comments: false,
          minimize:true,
          ascii_only:true,
          quote_keys:true,
          sourceMap: false,
          beautify: false,
          compress: {
            drop_console: true
          }
        }}),
        new webpack.optimize.DedupePlugin()
      ])
    }
  }
}
