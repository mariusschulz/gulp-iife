import _ from "lodash";

export default { surround };

let defaultOptions = {
    bindThis: false,
    prependSemicolon: true,
    useStrict: true,
    trimCode: true
};

function surround(code, userOptions) {
    let options = _.merge({}, defaultOptions, userOptions);

    let bindThis = options.bindThis ? ".bind(this)" : "",
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
