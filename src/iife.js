var _ = require("lodash");
var SourceMapGenerator = require("source-map").SourceMapGenerator;

module.exports = {
  surround,
};

let defaultOptions = {
  args: undefined,
  params: undefined,
  prependSemicolon: true,
  useStrict: true,
  trimCode: true,
  generateSourceMap: true,
};

function surround(code, userOptions, sourceMapOptions) {
  let options = _.merge({}, defaultOptions, userOptions);

  let useStrictLines = options.useStrict ? ['"use strict";', ""] : [];
  const trimmedCode = options.trimCode ? code.trim() : code;
  const prependedSemicolon = options.prependSemicolon ? ";" : "";
  const bindThis = options.bindThis ? ".bind(this)" : "";

  const { args, params } = getArgsAndParams(options);

  let lines = [
    `${prependedSemicolon}(function(${params}) {`,
    ...useStrictLines,
    trimmedCode,
    `}${bindThis}(${args}));`,
    "",
  ];

  let result = {
    code: lines.join("\n"),
  };

  if (sourceMapOptions && options.generateSourceMap !== false) {
    result.sourceMap = generateSourceMap(code, options, sourceMapOptions);
  }

  return result;
}

function getArgsAndParams(options) {
  const params = options.params || options.args || [];
  const args = options.args || options.params || [];

  return {
    args: args.join(", "),
    params: params.join(", "),
  };
}

function generateSourceMap(originalCode, options, sourceMapOptions) {
  // We don't care about trailing lines for the mapping
  let code = originalCode.trimRight();

  let sourceMapGenerator = new SourceMapGenerator({
    file: sourceMapOptions.fileName,
  });

  // We have at least one line of positive offset because of the start of the IIFE
  let linesOffset = 1;

  // Then we have optionally two more lines because of the "use strict"
  // and the empty line after that
  linesOffset += options.useStrict ? 2 : 0;

  // Then we have negative lines for the leading empty lines that are trimmed
  let leadingEmptyLines = ((code.match(/^\s+/) || [""])[0].match(/\n/g) || [])
    .length;
  linesOffset -= options.trimCode ? leadingEmptyLines : 0;

  // We add sourcemaps only for the non-empty lines.
  // So, we start the loop in the first non-empty line.
  // (The trailing empty lines are already trimmed.)
  let codeLines = (code.trimLeft().match(/\n/g) || []).length + 1;

  for (let i = 1 + leadingEmptyLines; i <= codeLines + leadingEmptyLines; i++) {
    sourceMapGenerator.addMapping({
      source: sourceMapOptions.fileName,
      original: {
        line: i,
        column: 0,
      },
      generated: {
        line: i + linesOffset,
        column: 0,
      },
    });
  }

  return sourceMapGenerator.toString();
}
