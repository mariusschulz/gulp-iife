let gulp = require("gulp");

const jsFilesGlob = "src/**/*.js";
const libDir = "lib/";

gulp.task("scripts", function() {
    return gulp.src(jsFilesGlob)
        .pipe(gulp.dest(libDir));
});

gulp.task("scripts-watch", function() {
    gulp.watch(jsFilesGlob, ["scripts"]);
});

gulp.task("default", ["scripts", "scripts-watch"]);
