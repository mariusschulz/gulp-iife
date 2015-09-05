module.exports = {
    surround: surround
};

function surround(code, options) {
    var bindThis = options.bindThis ? ".bind(this)" : "",
        leadingCode = "(function() {\n",
        trimmedCode = options.trimCode ? code.trim() : code,
        trailingCode = "\n}" + bindThis + "());\n";

    if (options.prependSemicolon) {
       leadingCode = ";" + leadingCode;
    }

    if (options.useStrict && !code.match(/^\s*(['"])use strict\1;/)) {
        leadingCode += '"use strict";\n\n';
    }

    return leadingCode + trimmedCode + trailingCode;
}
