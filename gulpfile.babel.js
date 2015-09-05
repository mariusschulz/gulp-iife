import gulp from "gulp";
import babel from "gulp-babel";

const jsFilesGlob = "src/**/*.js";
const libDir = "lib/";

gulp.task("scripts", function() {
    return gulp.src(jsFilesGlob)
        .pipe(babel())
        .pipe(gulp.dest(libDir));
});

gulp.task("scripts-watch", function() {
    gulp.watch(jsFilesGlob, ["scripts"]);
});

gulp.task("default", ["scripts", "scripts-watch"]);
