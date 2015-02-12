var _ = require('underscore');
var del = require('del');
var open = require("open");
var path = require('path');
var assign = require('object-assign');
var runSequence = require('run-sequence');

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var handleErrors = require('./util/handleErrors');
var notify = require("gulp-notify");

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');


// Get our Config.
var config = require('./config');
var webpackConfig = require('./webpack.config');


gulp.task('default', ['server']);
gulp.task('serve',   ['server']);
gulp.task('clean',   function(cb)       {del(['./'+config.outputFolder+'/**/*'], cb); });

gulp.task('server',  function(callback) {runSequence('clean', 'copy-files', 'webpack:server', callback); });
gulp.task('build',   function(callback) {runSequence('clean', 'copy-files', 'webpack:build', callback); });
gulp.task('deploy',  function(callback) {runSequence('build', 'gh:deploy', callback); });

// Copy static files from the source to the destination
gulp.task('copy-files', function () {
  var compile = function(){
    _.map(config.files,function(dest, src){
      gulp
        .src(src)
        .pipe(gulp.dest(dest));
    });
    notify('Vendors Updated');
  }
  compile()
  gulp
    .watch(_.keys(config.files),compile);
});


//Production Build.
//Minified, clean code. No demo keys inside.
//demo.html WILL NOT WORK with this build.
//
//Webpack handles CSS/SCSS, JS, and HTML files.
gulp.task('webpack:build', function(callback) {
  // Then, use Webpack to bundle all JS and html files to the destination folder
  webpack(_.values(webpackConfig.production), function(err, stats) {
    if (err) {throw new gutil.PluginError('webpack:build', err); }

    var jsonStats = stats.toJson();

    if(jsonStats.errors.length > 0)
        return new gutil.PluginError('webpack:build', JSON.stringify(jsonStats.errors));

    if(jsonStats.warnings.length > 0)
        return new gutil.PluginError('webpack:build', JSON.stringify(jsonStats.warnings));

    gutil.log('[webpack:build]', stats.toString({colors: true}));
    callback();
  });
});

// Dev Build
// Create the webpack compiler here for caching and performance.
var devCompiler = webpack(webpackConfig.development.browser);

// Build a Dev version of the project. Launched once on startup so we can have eveything copied.
gulp.task('webpack:build:dev', function(callback) {
  // run webpack with Dev profile.
  // Embeds the Hull config keys, and the necessary stuff to make demo.html work
  devCompiler.run(function(err, stats) {
    if (err)
      throw new gutil.PluginError('webpack:build', err);

    var jsonStats = stats.toJson();

    if(jsonStats.errors.length > 0)
        return new gutil.PluginError('webpack:build', JSON.stringify(jsonStats.errors));

    if(jsonStats.warnings.length > 0)
        return new gutil.PluginError('webpack:build', JSON.stringify(jsonStats.warnings));

    gutil.log('[webpack:build]', stats.toString({colors: true}));
    callback();
  });
});

// Launch webpack dev server.
gulp.task('webpack:server', function(callback) {
  var taskName = 'webpack:server';
  new WebpackDevServer(devCompiler, {
    contentBase: config.outputFolder,
    publicPath: '/'+config.assetsFolder+'/',
    hot: true,
    stats: {colors: true }
  }).listen(config.serverPort, '0.0.0.0', function(err) {
    handleError(err, taskName);
    // Dump the preview URL in the console, and open Chrome when launched for convenience.
    var url = webpackConfig.development.browser.output.publicPath+'webpack-dev-server/'
    gutil.log('['+taskName+']', url);
    open(url,'chrome');
  });
});

// Deploy production bundle to gh-pages.
gulp.task('gh:deploy', function () {
    return gulp.src(outputBundle)
      .pipe(deploy(options));
});


function handleError(err, taskName){
  if(err){
    notifier.notify({'title': taskName+' Error', 'message': err});
    throw new gutil.PluginError('webpack:build', err);
  }
}
