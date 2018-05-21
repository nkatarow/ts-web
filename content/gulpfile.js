var gulp = require ('gulp'),
	sass = require('gulp-ruby-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	merge = require('merge-stream'),
	del = require('del'),
	plumber = require('gulp-plumber');
	livereload = require('gulp-livereload');
	replace = require('gulp-replace');

var date = new Date();
var cssFilename = 'main.min.' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + '-' + date.getTime() + '.css';
var headerFilename = 'header-scripts.min.' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + '-' + date.getTime() + '.js';
var footerFilename = 'footer-scripts.min.' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + '-' + date.getTime() + '.js';

function onError(err) {
	console.log(err);
}

// Concat/autoprefix CSS
gulp.task('styles', function(){
	return sass('_ui/css/main.scss', { style: 'expanded'})
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4', '> 1%']}))
		.pipe(gulp.dest('_ui/compiled'))
		.pipe(plumber({errorHandler: onError}))
		.pipe(livereload());
});

// Concat JS
gulp.task('scripts', function(){
	var header = gulp.src('_ui/js/header-scripts/*.js')
		.pipe(concat('header-scripts.js'))
		.pipe(gulp.dest('_ui/compiled'))
		.pipe(plumber({errorHandler: onError}));

	var footer = gulp.src(['_ui/js/app.main.js', '_ui/js/footer-scripts/*.js', '_ui/js/components/*.js'])
		.pipe(concat('footer-scripts.js'))
		.pipe(gulp.dest('_ui/compiled'))
		.pipe(plumber({errorHandler: onError}))
		.pipe(livereload());

	return merge(header, footer);
});


// Minify / Uglify
gulp.task('minify', function(){
	return gulp.src('_ui/compiled/main.css')
		.pipe(cleanCSS())
		.pipe(rename(cssFilename))
		.pipe(gulp.dest('_ui/dist'))
		.pipe(plumber({errorHandler: onError}));
});
gulp.task('uglify', function(){
	var header = gulp.src('_ui/compiled/header-scripts.js')
		.pipe(rename(headerFilename))
		.pipe(uglify(''))
		.pipe(gulp.dest('_ui/dist'))
		.pipe(plumber({errorHandler: onError}));

	var footer = gulp.src('_ui/compiled/footer-scripts.js')
		.pipe(rename(footerFilename))
		.pipe(uglify(''))
		.pipe(gulp.dest('_ui/dist'))
		.pipe(plumber({errorHandler: onError}));

	return merge(header, footer);
});

// Cache Busting
gulp.task('cache', function(){
    gulp.src(['../craft/templates/_layout.html']) //must define base so I can overwrite the src file below. Per http://stackoverflow.com/questions/22418799/can-gulp-overwrite-all-src-files
        .pipe(replace(/<link id="stylesheet".*>/g, '<link id="stylesheet" rel="stylesheet" href="/_ui/dist/' + cssFilename + '" type="text/css" media="all">'))  //so find the script tag with an id of bundle, and replace its src.
        .pipe(replace(/<script id="header-scripts".*><\/script>/g, '<script id="header-scripts" src="/_ui/dist/' + headerFilename + '"></script>'))  //so find the script tag with an id of bundle, and replace its src.
        .pipe(replace(/<script id="footer-scripts".*><\/script>/g, '<script id="footer-scripts" src="/_ui/dist/' + footerFilename + '"></script>'))  //so find the script tag with an id of bundle, and replace its src.
        .pipe(gulp.dest('../craft/templates/')); //Write the file back to the same spot.
});

// Cleaners
gulp.task('cleancompiled', function(){
	return del(['_ui/compiled']);
});
gulp.task('cleandist', function(){
	return del(['_ui/dist']);
});


// Default task
gulp.task('default', ['cleancompiled'], function(){
	gulp.start('styles', 'scripts');
});

// Watch task
gulp.task('watch', function(){
	livereload.listen();

	gulp.watch('_ui/css/**/*.scss', ['styles']);
	gulp.watch('_ui/js/**/*.js', ['scripts']);
});

// Build task
gulp.task('build', ['cleandist'], function(){
	gulp.start('minify','uglify','cache');
});
