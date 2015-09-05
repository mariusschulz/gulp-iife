import _ from "lodash";

export default { surround };

function surround(code, userOptions) {
    let lines = [
        "(function() {",
        "\"use strict\";",
        "",
        code,
        "}());",
        ""
    ];

    return lines.join("\n");
}
