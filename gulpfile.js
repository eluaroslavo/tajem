var gulp    	 = require('gulp'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    sass    	 = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    uglify 	     = require('gulp-uglify'),
    cleanCSS 	 = require('gulp-clean-css')

gulp.task('browser-sync', ['styles'], function() {
    browserSync.init({
        proxy: "blog-v2.loc",
        notify: false
    });
});

var paths = {
    html:['./app/views/**/*.php'],
    css:['./sass/**/*.sass'],
    script:['./app/teplate/js/*.js']
};

gulp.task('styles', function () {
    return gulp.src(paths.css)
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(cleanCSS({format: 'beautify'}))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch(paths.css, ['styles']);
    //gulp.watch(paths.script).on("change", reload);
    //gulp.watch(paths.html).on('change', reload);
});

gulp.task('default', ['watch']);
