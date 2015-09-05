var _ = require("lodash");
var Stream = require("stream");
var iife = require("./iife");

function gulpIife(userOptions) {
    "use strict";

    var defaultOptions = { useStrict: true, trimCode: true, prependSemicolon: true, bindThis: false };
    var options = _.merge({}, defaultOptions, userOptions);

    var stream = new Stream.Transform({ objectMode: true });

    stream._transform = function(file, encoding, callback) {
        var contents = String(file.contents);
        var wrappedContents = iife.surround(contents, options);

        file.contents = Buffer(wrappedContents);

        callback(null, file);
    };

    return stream;
}

module.exports = gulpIife;
