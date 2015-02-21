
// We need a bunch of dependencies, but they all do an important
// part of this workflow
var gulp = require('gulp');
var $           = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var less        = require('gulp-less');

// We create an array of dependencies. These are NPM modules you have
// installed in node_modules. Think: "require('react')" or "require('underscore')"
var dependencies = [
    'react' // react is part of this boilerplate
];

// Now this task both runs your workflow and deploys the code,
// so you will see "options.development" being used to differenciate
// what to do
var browserifyTask = function (options) {

  /* First we define our application bundler. This bundle is the
     files you create in the "app" folder */
    var appBundler = browserify({
        entries: [options.src], // The entry file, normally "main.js"
        transform: [reactify], // Convert JSX style
        debug: options.development, // Sourcemapping
        extensions: ['.jsx'],
        paths: ['./node_modules', './app/scripts/'],
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    /* We set our dependencies as externals of our app bundler.
     For some reason it does not work to set these in the options above */
  appBundler.external(options.development ? dependencies : []);
  
  /* This is the actual rebundle process of our application bundle. It produces
    a "main.js" file in our "build" folder. */
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('app.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload())) // It notifies livereload about a change if you use it
      .pipe(notify(function () {
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
  rebundle();

  if (options.development) {

    // // We need to find all our test files to pass to our test bundler
    // var testFiles = glob.sync('./specs/**/*-spec.js');
    
    // /* This bundle will include all the test files and whatever modules
    //    they require from the application */
    // var testBundler = browserify({
    //   entries: testFiles,
    //   debug: true,
    //   transform: [reactify],
    //   cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    // });

    // // Again we tell this bundle about our external dependencies
    // testBundler.external(dependencies);

    // /* Now this is the actual bundle process that ends up in a "specs.js" file
    //   in our "build" folder */
    // var rebundleTests = function () {
    //   var start = Date.now();
    //   console.log('Building TEST bundle');
    //   testBundler.bundle()
    //     .on('error', gutil.log)
    //     .pipe(source('specs.js'))
    //     .pipe(gulp.dest(options.dest))
    //     .pipe(livereload()) // Every time it rebundles it triggers livereload
    //     .pipe(notify(function () {
    //       console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
    //     }));
    // };
    
    // // We watch our test bundle
    // testBundler = watchify(testBundler);
    
    // // We make sure it rebundles on file change
    // testBundler.on('update', rebundleTests);
    
    // // Then we create the first bundle
    // rebundleTests();

    /* And now we have to create our third bundle, which are our external dependencies,
      or vendors. This is React JS, underscore, jQuery etc. We only do this when developing
      as our deployed code will be one file with all application files and vendors */
    var vendorsBundler = browserify({
      debug: true, // It is nice to have sourcemapping when developing
      require: dependencies
    });
    
    /* We only run the vendor bundler once, as we do not care about changes here,
      as there are none */
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));
    
  }
  
}

// We also have a simple css task here that you can replace with
// SaSS, Less or whatever
var cssTask = function (options) {
    if (options.development) {
      var run = function () {
        gulp.src(options.src)
          .pipe(less())
          .pipe(concat('styles.css'))
          .pipe(gulp.dest(options.dest));
      };
      run();
      gulp.watch(options.src, run);
    } else {
      gulp.src(options.src)
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(options.dest));   
    }
}

// Fonts
var fontsTask = function(options) {
   gulp.src('./app/bower_components/fontawesome/fonts/*.*')
   .pipe(gulp.dest(options.dest));
};

// Starts our development workflow
gulp.task('default', function () {

  browserifyTask({
    development: true,
    src: './app/scripts/app.js',
    dest: './.tmp/scripts'
  });
  
  cssTask({
    development: true,
    src: './app/styles/styles.less',
    dest: './.tmp/styles'
  });

  fontsTask({
    dest: '.tmp/fonts'
  });

  return gulp.src(['.tmp', 'app'])
    .pipe($.webserver({
      host: 'localhost', //change to 'localhost' to disable outside connections
      livereload: true,
      open: true
    }));

});

// Deploys code to our "dist" folder
gulp.task('deploy', function () {

  browserifyTask({
    development: false,
    src: './app/scripts/app.js',
    dest: './dist/scripts'
  });
  
  cssTask({
    development: false,
    src: './app/styles/styles.less',
    dest: './dist/styles'
  });

  fontsTask({
    dest: '.dist/fonts'
  });


});







// var gulp        = require('gulp');

// var $           = require('gulp-load-plugins')();
// var del         = require('del');
// var source      = require('vinyl-source-stream');
// var browserify  = require('browserify');
// var runSequence = require('run-sequence');
// var less        = require('gulp-less');
// var transform = require('vinyl-transform');
// var exorcist = require('exorcist');
// var concat = require('gulp-concat');
// var reactify = require('reactify');

// var env = 'dev';

// gulp.task('clean:dev', function() {
//   return del(['.tmp']);
// });

// gulp.task('clean:dist', function() {
//   return del(['dist']);
// });

// gulp.task('scripts', function() {
//   var bundler = browserify('./app/scripts/app.js', {
//     extensions: ['.jsx'],
//     debug: env == 'dev',
//     paths: ['./node_modules', './app/scripts/'],
//     transform: [reactify]
//   });

//   return bundler.bundle()
//     .pipe(source('app.js'))
//     .pipe(gulp.dest('.tmp/scripts'));
// });


// gulp.task('imagemin', function() {
//   return gulp.src('app/images/*')
//     .pipe($.imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}]
//     }))
//     .pipe(gulp.dest('dist/images'));
// });

// // Less
// gulp.task('less', function () {
//   return gulp.src('./app/styles/styles.less')
//     .pipe(less())
//     .pipe(gulp.dest('.tmp/styles'));
// });

// // Fonts
// gulp.task('fonts', function() {
//    gulp.src('./app/bower_components/fontawesome/fonts/*.*')
//    .pipe(gulp.dest('.tmp/fonts'));
// });

// // Vendor scripts
// gulp.task('vendor', function() {
//   // gulp.src('./node_modules/react/dist/react-with-addons.min.js')
//   // .pipe(gulp.dest('.tmp/scripts'));
// });

// gulp.task('copy', function() {
//   return gulp.src(['app/*.txt', 'app/*.ico'])
//     .pipe(gulp.dest('dist'));
// })

// gulp.task('bundle', function () {
//   var assets = $.useref.assets({searchPath: '{.tmp,app}'});
//   var jsFilter = $.filter(['**/*.js']);
//   var cssFilter = $.filter(['**/*.css']);
//   var htmlFilter = $.filter(['*.html']);
//   var lessFilter = $.filter(['styles/styles.less']);

//   return gulp.src('app/*.html')
//     .pipe(assets)
//     .pipe(assets.restore())
//     .pipe($.useref())
//     .pipe(jsFilter)
//     .pipe($.uglify())
//     .pipe(jsFilter.restore())
//     .pipe(cssFilter)
//     .pipe($.autoprefixer({
//       browsers: ['last 5 versions']
//     }))
//     .pipe($.minifyCss())
//     .pipe(cssFilter.restore())
//     .pipe(htmlFilter)
//     .pipe($.htmlmin({collapseWhitespace: true}))
//     .pipe(htmlFilter.restore())
//     .pipe($.revAll({ ignore: [/^\/favicon.ico$/g, '.html'] }))
//     .pipe($.revReplace())
//     .pipe(gulp.dest('dist'))
//     .pipe($.size());
// });

// gulp.task('webserver', function() {
//   return gulp.src(['.tmp', 'app'])
//     .pipe($.webserver({
//       host: 'localhost', //change to 'localhost' to disable outside connections
//       livereload: true,
//       open: true
//     }));
// });

// gulp.task('serve', function() {
//   runSequence('clean:dev', 'less', 'vendor', 'fonts', ['scripts'], 'webserver');

//   gulp.watch('app/*.html');

//   gulp.watch('app/scripts/**/*.js', ['scripts']);

//   gulp.watch('app/scripts/**/*.jsx', ['scripts']);

//   gulp.watch('app/styles/*.less', ['less']);
  
// });

// gulp.task('build', function() {
//   env = 'prod';

//   runSequence(['clean:dev', 'clean:dist'],
//               ['less', 'fonts', 'vendor', 'scripts', 'imagemin', 'copy'],
//               'bundle');
// });
