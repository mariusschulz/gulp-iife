var gulp = require("gulp");
var babel = require("gulp-babel");

var srcScriptsGlob = "src/**/*.js";
var testScriptsGlob = "test/src/**/*.js";

var srcTargetDir = "lib/";
var testTargetDir = "test/transpiled/";

var babelOptions = {
  presets: ["es2015"],
};

gulp.task("transpile-src", function () {
  return gulp
    .src(srcScriptsGlob)
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(srcTargetDir));
});

gulp.task("transpile-test", function () {
  return gulp
    .src(testScriptsGlob)
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(testTargetDir));
});

gulp.task("watch-transpile", function () {
  gulp.watch(srcScriptsGlob, ["transpile-src"]);
  gulp.watch(testScriptsGlob, ["transpile-test"]);
});

gulp.task("transpile", ["transpile-src", "transpile-test"]);

gulp.task("default", ["transpile", "watch-transpile"]);
