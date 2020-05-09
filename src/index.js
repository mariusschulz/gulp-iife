const through = require("through2");
const applySourceMap = require("vinyl-sourcemaps-apply");
const iife = require("./iife");

module.exports = function gulpIife(userOptions) {
  return through.obj(function (file, encoding, callback) {
    const contents = String(file.contents);
    const sourceMapOptions = file.sourceMap
      ? { fileName: file.relative }
      : null;

    const result = iife.surround(contents, userOptions, sourceMapOptions);
    file.contents = Buffer(result.code);

    if (file.sourceMap) {
      applySourceMap(file, result.sourceMap);
    }

    callback(null, file);
  });
};
