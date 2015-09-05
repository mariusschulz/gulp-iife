import _ from "lodash";

export default { surround };

function surround(code, userOptions) {
    return surroundWithIife(code);
}

function surroundWithIife(code) {
    return `(function() {\n${code}\n}());\n`;
}
