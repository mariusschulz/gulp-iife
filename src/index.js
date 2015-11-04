var through = require("through2");
var iife = require("./iife");

module.exports = function gulpIife(userOptions) {
    return through.obj(function(file, encoding, callback) {
        const contents = String(file.contents);
        const wrappedContents = iife.surround(contents, userOptions);

        file.contents = Buffer(wrappedContents);

        callback(null, file);
    });
}
