var Stream = require("stream");
var _ = require("lodash");

function gulpIife(userOptions) {
    "use strict";

    var defaultOptions = { useStrict: true, trimCode: true };
    var options = _.merge({}, defaultOptions, userOptions);

    var stream = new Stream.Transform({ objectMode: true });

    stream._transform = function(file, encoding, callback) {
        var contents = String(file.contents);
        var wrappedContents = surroundWithIife(contents, options);

        file.contents = Buffer(wrappedContents);
        
        callback(null, file);
    };

    return stream;
}

function surroundWithIife(code, options) {
    var leadingCode = "(function() {\n",
        trimmedCode = options.trimCode ? code.trim() : code,
        trailingCode = "\n}());\n";

    if (options.useStrict && !code.match(/^\s*(['"])use strict\1;/)) {
        leadingCode += '"use strict";\n\n';
    }

    return leadingCode + trimmedCode + trailingCode;
}

module.exports = gulpIife;
