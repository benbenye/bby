var gulp = require('gulp'),
	gutil = require('gulp-util'),
	less = require('gulp-less'),
	cssMin = require('gulp-minify-css'),
	cssPreFix = require('gulp-css-prefix'),
	imgMin = require('gulp-imagemin'),
	uglify = require('gulp-uglify');

gulp.task('cssMin', function(){
	gulp.src('./public/styleSheets/*.css')
		.pipe(cssMin())
		.pipe(gulp.dest('./dest/styleSheets/style'));
});

gulp.task('imgMin', function(){
	gulp.src('./public/images/*.png')
	.pipe(imgMin())
	.pipe(gulp.dest('./dest/images'));
});
gulp.task('compressJs', function(){
	gulp.src('./public/javascripts/page/collect_page.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dest/javascripts'));
})

gulp.task('cssPreFix', function(){
	gulp.src('./public/styleSheets/*.css')
	.pipe(cssPreFix('bby-'))
	.pipe(gulp.dest('./dest/styleSheets/style.bby.css'));
});
gulp.task('default',['cssMin','cssPreFix','imgMin','compressJs']);