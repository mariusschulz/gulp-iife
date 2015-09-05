import gulp from "gulp";
import babel from "gulp-babel";

const srcScriptsGlob = "src/**/*.js";
const testScriptsGlob = "test/src/**/*.js";

const srcTargetDir = "lib/";
const testTargetDir = "test/transpiled/";

gulp.task("transpile-src", function() {
    return gulp.src(srcScriptsGlob)
        .pipe(babel())
        .pipe(gulp.dest(srcTargetDir));
});

gulp.task("transpile-test", function() {
    return gulp.src(testScriptsGlob)
        .pipe(babel())
        .pipe(gulp.dest(testTargetDir));
});

gulp.task("watch-transpile", function() {
    gulp.watch(srcScriptsGlob, ["transpile-src"]);
    gulp.watch(testScriptsGlob, ["transpile-test"]);
});

gulp.task("transpile", ["transpile-src", "transpile-test"]);

gulp.task("default", ["transpile", "watch-transpile"]);
