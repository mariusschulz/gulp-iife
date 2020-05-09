import * as through from "through2";
import * as applySourceMap from "vinyl-sourcemaps-apply";
import * as iife from "./iife";

module.exports = function gulpIife(userOptions: any) {
  return through.obj(function (file, encoding, callback) {
    const contents = String(file.contents);
    const sourceMapOptions = file.sourceMap
      ? { fileName: file.relative }
      : null;

    const result = iife.surround(contents, userOptions, sourceMapOptions);
    file.contents = new Buffer(result.code);

    if (file.sourceMap) {
      applySourceMap(file, result.sourceMap);
    }

    callback(null, file);
  });
};
