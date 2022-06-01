//const { task } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require('browser-sync').create();

//SASS
gulp.task("sass", function (done) {
    return gulp
        .src(["./src/sass/**/*.sass", "!./src/sass/widget.sass"])
        //*.sass - all files at the end of the path
        // **/*.sass - match all files at the end of the path plus all clildren files and folders
        // !*.sass or !**/*.sass - exclude the matchinf expressions 
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist/css"));
    done();
});

// Browsersync
 /*gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        browser: "chrome"
    });
}); */

// Watch Task with Browsersync
gulp.task("watch", function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        browser: "chrome"
    });
    gulp
        .watch("./src/sass/**/*.sass", gulp.series(["sass"]))
        .on("change", browserSync.reload);
});





