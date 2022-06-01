//const { task } = require('gulp');
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const less = require("gulp-less")
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const { doesNotThrow } = require("assert");



//SASS
gulp.task("sass", function (done) {
    return gulp
        .src(["./src/sass/**/*.sass", "!./src/sass/widget.sass"])
        //*.sass - all files at the end of the path
        // **/*.sass - match all files at the end of the path plus all clildren files and folders
        // !*.sass or !**/*.sass - exclude the matchinf expressions 
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(sourcemaps.write("."))
        .pipe(rename(function (path) {
            if (!path.extname.endsWith(".map")) {
                 path.basename += ".min"
            }
           
        }))
        .pipe(gulp.dest("./dist/css"));
    done();
});

// Less
gulp.task("less", function (done) {
    return (
        gulp.src("./src/less/styles.less")
            .pipe(sourcemaps.init())
            .pipe(less())
             .pipe(cssnano())
            .pipe(sourcemaps.write("."))
            .pipe(rename("./styles.min.css"))
            .pipe(gulp.dest("./dist/css"))
    )
    done();
});

//Javascript
gulp.task("javascript", function (done) {
    return (
        gulp.src(["./src/js/alert.js", "./src/js/project.js"])
            .pipe(concat("project.js"))
            .pipe(uglify())
            .pipe(rename({
                suffix: ".min"
            }))
        .pipe(gulp.dest("./dist/js"))
)
done();
})

//Images optimization
gulp.task("imagemin", function (done) {
    return (
        gulp.src("./src/img/**/*.+(png|jpg|gif|svg)") 
        .pipe(cache(imagemin()))
        .pipe(gulp.dest("./dist/img/"))
    )
done();
})

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
        .watch([
            "./src/sass/**/*.sass",
            "**/*.html", "./src/less/styles.less",
            "./src/js/**/*.js",
            "./src/img/**/*.+(png|jpg|gif|svg)"
        ],
            gulp.series(["sass", "less", "javascript", "imagemin"]))
        .on("change", browserSync.reload);
});


gulp.task("clear-cache", function (done) {
    return cache.clearAll(done)
});

// Gulp default command

gulp.task("default", gulp.series(["watch"]));
    