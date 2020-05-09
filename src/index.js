var through = require("through2");
var applySourceMap = require("vinyl-sourcemaps-apply");
var iife = require("./iife");

module.exports = function gulpIife(userOptions) {
  return through.obj(function (file, encoding, callback) {
    let contents = String(file.contents);
    let sourceMapOptions = file.sourceMap ? { fileName: file.relative } : null;

    let result = iife.surround(contents, userOptions, sourceMapOptions);
    file.contents = Buffer(result.code);

    if (file.sourceMap) {
      applySourceMap(file, result.sourceMap);
    }

    callback(null, file);
  });
};
