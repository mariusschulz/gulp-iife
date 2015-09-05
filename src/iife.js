import _ from "lodash";

export default { surround };

let defaultOptions = {
    prependSemicolon: true,
    useStrict: true,
    trimCode: true
};

function surround(code, userOptions) {
    let options = _.merge({}, defaultOptions, userOptions);
    let useStrictLines = options.useStrict
        ? ["\"use strict\";", ""]
        : [];

    const trimmedCode = options.trimCode ? code.trim() : code;
    const prependedSemicolon = options.prependSemicolon ? ";" : "";
    const bindThis = options.bindThis ? ".bind(this)" : "";

    let lines = [
        prependedSemicolon + "(function() {",
        ...useStrictLines,
        trimmedCode,
        `}${bindThis}());`,
        ""
    ];

    return lines.join("\n");
}
