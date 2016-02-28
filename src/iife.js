var _ = require("lodash");
var SourceMapGenerator = require("source-map").SourceMapGenerator;

module.exports = {
    surround
};

let defaultOptions = {
    args: undefined,
    params: undefined,
    prependSemicolon: true,
    useStrict: true,
    trimCode: true,
    generateSourceMap: true
};

function surround(code, userOptions, sourceMapOptions) {
    let options = _.merge({}, defaultOptions, userOptions);

    let useStrictLines = options.useStrict ? ["\"use strict\";", ""] : [];
    const trimmedCode = options.trimCode ? code.trim() : code;
    const prependedSemicolon = options.prependSemicolon ? ";" : "";
    const bindThis = options.bindThis ? ".bind(this)" : "";

    const { args, params } = getArgsAndParams(options);

    let lines = [
        `${prependedSemicolon}(function(${params}) {`,
        ...useStrictLines,
        trimmedCode,
        `}${bindThis}(${args}));`,
        ""
    ];

    let result = {
        code: lines.join("\n")
    };

    if (sourceMapOptions && options.generateSourceMap !== false) {
        let smg = new SourceMapGenerator({ file: sourceMapOptions.fileName });

        let linesOffset = 1;
        linesOffset += options.useStrict ? 2 : 0;
        // TODO add trimmed lines

        let codeLines = (trimmedCode.match(/\n/g) || []).length + 1;

        for (let i = 1; i <= codeLines; i++) {
            smg.addMapping({
                source: sourceMapOptions.fileName,
                original: {
                    line: i,
                    column: 0
                },
                generated: {
                    line: i + linesOffset,
                    column: 0
                }
            });
        }

        result.sourceMap = smg.toString();
    }

    return result;
}

function getArgsAndParams(options) {
    const params = options.params || options.args || [];
    const args = options.args || options.params || [];

    return {
        args: args.join(", "),
        params: params.join(", ")
    };
}
