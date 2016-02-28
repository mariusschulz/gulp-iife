var through = require("through2");
var applySourceMap = require('vinyl-sourcemaps-apply');
var iife = require("./iife");

module.exports = function gulpIife(userOptions) {
    return through.obj(function(file, encoding, callback) {
        let contents = String(file.contents);

        if (file.sourceMap) {
            userOptions = userOptions || {};
            userOptions.generateSourceMap = true;
            userOptions.fileName = file.relative;
        }

        let result = iife.surround(contents, userOptions);
        file.contents = Buffer(result.code);

        if (file.sourceMap) {
            applySourceMap(file, result.sourceMap);
        }

        callback(null, file);
    });
}
