import _ from "lodash";

export default { surround };

let defaultOptions = {
    useStrict: true,
    trimCode: true
};

function surround(code, userOptions) {
    let options = _.merge({}, defaultOptions, userOptions);
    let useStrictLines = options.useStrict
        ? ["\"use strict\";", ""]
        : [];

    let trimmedCode = options.trimCode ? code.trim() : code;

    let lines = [
        "(function() {",
        ...useStrictLines,
        trimmedCode,
        "}());",
        ""
    ];

    return lines.join("\n");
}
