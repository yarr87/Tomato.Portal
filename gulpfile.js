
// We need a bunch of dependencies, but they all do an important
// part of this workflow
var gulp = require('gulp');
var $           = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var del         = require('del');
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var watchify = require('watchify');
var reactify = require('reactify'); 
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var less        = require('gulp-less');
var runSequence = require('run-sequence');
var buffer = require('gulp-buffer');
var rev = require('gulp-rev');
var revReplace = require("gulp-rev-replace");
var es = require('event-stream');
var inject = require('gulp-inject');
var jsoncombine = require('gulp-jsoncombine');
var replace = require("gulp-replace");

// We create an array of dependencies. These are NPM modules you have
// installed in node_modules. Think: "require('react')" or "require('underscore')"
// These will go in the vendor.js file
var dependencies = [
    'react',
    'jquery',
    'lodash',
    'bluebird',
    'superagent',
    'superagent-bluebird-promise'
    // Do not include bootstrap here, it ends up getting defined before jquery and nothing works
    //'bootstrap'
];

// Now this task both runs your workflow and deploys the code,
// so you will see "options.development" being used to differenciate
// what to do
var browserifyTask = function (options) {

  /* First we define our application bundler. This bundle is the
     files you create in the "app" folder */
    var appBundler = browserify({
        entries: [options.src], // The entry file, normally "main.js"
        //transform: [browserifyShim, reactify], // Convert JSX style
        debug: options.development, // Sourcemapping
        extensions: ['.jsx'],
        paths: ['./node_modules', './app/scripts/'],
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    /* We set our dependencies as externals of our app bundler.
     For some reason it does not work to set these in the options above */
  appBundler.external(dependencies);//options.development ? dependencies : []);

  // using the transform options property double-shims stuff.  This doesn't.
  // Seems like babelify needs to go before browser-shim, but reactify was always after it.  Not sure if
  // the order matteres for reactify.
  // Note: babelify takes care of react jsx compilation and es6 transpilation
  appBundler.transform('babelify');
  appBundler.transform('browserify-shim');
  //appBundler.transform('reactify');
  
  /* This is the actual rebundle process of our application bundle. It produces
    a "main.js" file in our "build" folder. */
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');

    var it = appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('app.js'));

    if (options.development) {
      it = it.pipe(gulp.dest(options.dest))
             .pipe(livereload());
    }
    else {
      it = it.pipe(streamify(uglify()))
             .pipe(buffer())
             .pipe(rev())
             .pipe(gulp.dest(options.dest))
             .pipe(rev.manifest('js-app-rev.json', { base: 'dist', merge: true }))
             .pipe(gulp.dest(options.dest));
    }

    return it.pipe(notify(function() {
      console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
    }));
  };

  /* When we are developing we want to watch for changes and
    trigger a rebundle */
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }
  
  // And trigger the initial bundling
  return rebundle();
}

var vendorJSTask = function(options) {

    /* And now we have to create our third bundle, which are our external dependencies,
      or vendors. This is React JS, underscore, jQuery etc. */
    var vendorsBundler = browserify({
      // No need for sourcemaps on vendor files, even in dev
      debug: false,// options.development,
      require: dependencies
    });

    var start = new Date();
    console.log('Building VENDORS bundle');

    var it = vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'));

    if (options.development) {
      it = it.pipe(gulp.dest(options.dest));
    }
    else {
      it = it.pipe(streamify(uglify()))
             .pipe(buffer())
             .pipe(rev())
             .pipe(gulp.dest(options.dest))
             .pipe(rev.manifest('js-vendor-rev.json', { base: 'dist', merge: true }))
             .pipe(gulp.dest(options.dest));
    }

    return it.pipe(notify(function() {
      console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
    }));
}

// We also have a simple css task here that you can replace with
// SaSS, Less or whatever
var cssTask = function (options) {

  var run = function() {

    var it = gulp.src(options.src)
                 .pipe(less())
                 .pipe(concat('styles.css'));

    if (!options.development) {
      it = it.pipe(cssmin())
             .pipe(buffer())
             .pipe(rev())
             .pipe(gulp.dest(options.dest))
             .pipe(rev.manifest('css-rev.json', { base: 'dist', merge: true }));
    }

    return it.pipe(gulp.dest(options.dest));
  };

  var result = run();

  if (options.development) {
    gulp.watch('./app/styles/**/*.less', run);
  }

  return result;
}

// Fonts
var fontsTask = function(options) {
   return gulp.src('./app/bower_components/fontawesome/fonts/*.*')
              .pipe(gulp.dest(options.dest));
};

// ********************************************************************************************************
// Font tasks
// ********************************************************************************************************
gulp.task('fonts:dev', function() {
  return fontsTask({
    dest: '.tmp/fonts'
  });
});

gulp.task('fonts:dist', function() {
  return fontsTask({
    dest: './dist/fonts'
  });
});

// ********************************************************************************************************
// JS-app tasks
// ********************************************************************************************************
gulp.task('js:app:dev', ['clean:dev'], function() {
  return browserifyTask({
    development: true,
    src: './app/scripts/app.js',
    dest: './.tmp/scripts'
  });
});


gulp.task('js:app:dist', ['clean:dist'], function() {
  return browserifyTask({
    development: false,
    src: './app/scripts/app.js',
    dest: './dist/scripts'
  });
});

// ********************************************************************************************************
// JS-vendor tasks
// ********************************************************************************************************
gulp.task('js:vendor:dev', ['clean:dev'], function() {
  return vendorJSTask({
    development: true,
    src: './app/scripts/app.js',
    dest: './.tmp/scripts'
  });
});

gulp.task('js:vendor:dist', ['clean:dist'], function() {
  return vendorJSTask({
    development: false,
    src: './app/scripts/app.js',
    dest: './dist/scripts'
  });
});

// ********************************************************************************************************
// css tasks
// ********************************************************************************************************
gulp.task('css:dev', ['clean:dev'], function() {
  return cssTask({
    development: true,
    src: './app/styles/styles.less',
    dest: './.tmp/styles'
  });
});

gulp.task('css:dist', ['clean:dist'], function() {
  return cssTask({
    development: false,
    src: './app/styles/styles.less',
    dest: './dist/styles'
  });
});

// ********************************************************************************************************
// Copy tasks 
// ********************************************************************************************************
gulp.task('copy-html:dist', ['clean:dist'], function() {
  return gulp.src(['./app/*.html'])
             .pipe(gulp.dest('./dist'));
});

gulp.task('copy-script:dist', ['clean:dist'], function() {
  return gulp.src(['./app/scripts/hubs/deviceStateHub.js'])
             .pipe(gulp.dest('./dist/scripts/hubs'));
});

gulp.task('copy-bower:dist', ['clean:dist'], function() {
  return gulp.src(['./app/bower_components/signalr/jquery.signalR.min.js'])
             .pipe(gulp.dest('./dist/bower_components/signalr'));
});

// ********************************************************************************************************
// Clean tasks 
// ********************************************************************************************************
gulp.task('clean:dev', function() {
  return del(['./.tmp/**/*.*']);
});

gulp.task('clean:dist', function() {
  console.log('clean:dist');
   return del(['./dist/**/*.*']);
}); 

// Starts our development workflow
gulp.task('default', ['js:app:dev', 'js:vendor:dev', 'css:dev', 'fonts:dev'], function () {

  return gulp.src(['.tmp', 'app'])
    .pipe($.webserver({
      host: '0.0.0.0', //change to 'localhost' to disable outside connections
      //host: 'localhost',
      livereload: true,
      open: true
    }));

});

gulp.task('deploy', ['js:app:dist', 'js:vendor:dist', 'css:dist', 'fonts:dist', 'copy-html:dist', 'copy-script:dist', 'copy-bower:dist'], function() {
  
  // Rename references in html files once everything else is done (js/css renaming, html copying)

  // Load all the rev.json files
  // Couldn't get it working with a single manifest file, tasks kept overwriting each other
  return gulp.src(['./dist/css-rev.json', './dist/js-app-rev.json', './dist/js-vendor-rev.json'])
             .pipe(jsoncombine('rev.json',function(data) {

                var manifest = {};

                // Create an object mapping original file names to new ones
                manifest['styles.css'] = data['css-rev']['styles.css'];
                manifest['app.js'] = data['js-app-rev']['app.js'];
                manifest['vendors.js'] = data['js-vendor-rev']['vendors.js'];

                var stream = gulp.src('./dist/index.html');

                // Manually replace all instances of the old file names with the new ones
                var updated = Object.keys(manifest).reduce(function(stream, key){ 
                  return stream.pipe(replace(key, manifest[key]));
                }, stream)

                return updated.pipe(gulp.dest('./dist'));

             }));

});

// Runs code from the last deployed build
gulp.task('prod', function() {
  //runSequence(['deploy']);

  return gulp.src(['./dist'])
    .pipe($.webserver({
      host: '0.0.0.0',
      livereload: false,
      open: true
    }));
});