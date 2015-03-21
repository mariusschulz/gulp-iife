var Stream = require("stream");

function gulpIife() {
    "use strict";

    var stream = new Stream.Transform({ objectMode: true });

    stream._transform = function(file, encoding, callback) {
        var contents = String(file.contents);
        var wrappedContents = surroundWithIife(contents);

        file.contents = Buffer(wrappedContents);
        
        callback(null, file);
    };

    return stream;
}

function surroundWithIife(code) {
    return [
        "(function() {",
        code,
        "}());"
    ].join("\n");
}

module.exports = gulpIife;
