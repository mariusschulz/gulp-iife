var through = require("through2");
var iife = require("./iife");

function gulpIife(userOptions) {
    "use strict";

    return through.obj(function(file, encoding, callback) {
        var contents = String(file.contents);
        var wrappedContents = iife.surround(contents, userOptions);

        file.contents = Buffer(wrappedContents);

        callback(null, file);
    });
}

module.exports = gulpIife;
