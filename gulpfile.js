var gulp = require('gulp');
var pug = require('gulp-htmlmin');
// var less = require('gulp-less');
var uglify = require('gulp-uglify');													// minifying the js files. triggered only in 'deploy' task below
var clean = require('gulp-clean');													// removing files from a directory
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-csso');
var stylish = require('jshint-stylish');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var gutil = require('gulp-util');


var options = new function() {
	
	this.TPL_SRC = 'client/app/**/*.tpl',
	this.ANGULAR_MODULE_NAME = 'app',

	this.CSS_SRC = 'client/assets/css/**/*',
	this.FONTS_SRC = 'client/assets/fonts/**/*',
	this.IMAGES_SRC = 'client/assets/images/**/*',

	// this.JS_SRC_PROD = [ '!assets/libs/js/sails.io.js','assets/libs/js/**/*.js',  'assets/js/app.js', 'assets/js/**/*.js', 'assets/profiles/prod/**/*.js'],
	
	this.JS_SRC_DEV = 'client/app/user/*.js',
	
	this.DEST_SRC = 'client/assets/build',
	this.TPL_DEST = 'client/assets/build/',
	this.FONTS_DEST = this.DEST_SRC + '/fonts',
	this.IMAGES_DEST = this.DEST_SRC + '/images',
	this.JS_DEST = this.DEST_SRC + '/js',
	this.CSS_DEST = this.DEST_SRC + '/css',

	this.JS_DEST_NAME = 'app.min.js',
	this.CSS_DEST_NAME = 'app.min.css',
	this.TEMPLATES_DEST_NAME = 'templates.js'										
};


gulp.task('jshint', function() {
	return gulp.src(options.JS_SRC_DEV)													
		.pipe(jshint( {globals:{angular: true}} ))			// adding angular to global scope to avoid angular not found errors in lint
		.pipe(jshint.reporter(stylish));
});

gulp.task('uglify', function() {
  return gulp.src(options.JS_SRC_DEV)
  		.pipe(concat(options.JS_DEST_NAME))
    	.pipe(uglify())
    	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    	.pipe(gulp.dest(options.JS_DEST));
});

gulp.task('js', ['jshint', 'uglify'], function() {
	return gulp.src(options.JS_SRC_DEV)
		// .pipe(uglify({mangle: false}))
		//.pipe(ngmin())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest(options.JS_DEST));
});




gulp.task('html', function(){
  return gulp.src('client/app/**/*.tpl')
    .pipe(pug())
    .pipe(gulp.dest('client/assets/build/html'))
});


gulp.task('css', function() {
	return gulp.src(options.CSS_SRC)
		.pipe(concat(options.CSS_DEST_NAME))
		// .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(minifycss())
		.pipe(gulp.dest(options.CSS_DEST));
});

gulp.task('clean', function() {
	return gulp.src(['client/build/*']
		.concat(options.PARTIALS_DEST + '/*'), {read: false})
		.pipe(clean( {force: true} ));
});

gulp.task('default', [ 'js', 'html', 'css' ]);