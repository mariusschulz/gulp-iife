import _ from "lodash";

export default { surround };

let defaultOptions = {
    useStrict: true
};

function surround(code, userOptions) {
    let options = _.merge({}, defaultOptions, userOptions);
    let useStrictLines = options.useStrict
        ? ["\"use strict\";", ""]
        : [];

    let lines = [
        "(function() {",
        ...useStrictLines,
        code.trim(),
        "}());",
        ""
    ];

    return lines.join("\n");
}
