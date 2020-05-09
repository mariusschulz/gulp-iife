import { SourceMapGenerator } from "source-map";

type Options = {
  args: string[] | null;
  bindThis: boolean;
  generateSourceMap: boolean;
  params: string[] | null;
  prependSemicolon: boolean;
  useStrict: boolean;
  trimCode: boolean;
};

const defaultOptions: Options = {
  args: null,
  bindThis: false,
  generateSourceMap: true,
  params: null,
  prependSemicolon: true,
  useStrict: true,
  trimCode: true,
};

export function surround(
  code: string,
  userOptions: Partial<Options>,
  sourceMapOptions: any
) {
  const options: Options = {
    ...defaultOptions,
    ...userOptions,
  };

  const useStrictLines = options.useStrict ? ['"use strict";', ""] : [];
  const trimmedCode = options.trimCode ? code.trim() : code;
  const prependedSemicolon = options.prependSemicolon ? ";" : "";
  const bindThis = options.bindThis ? ".bind(this)" : "";

  const { args, params } = getArgsAndParams(options);

  const lines = [
    `${prependedSemicolon}(function(${params}) {`,
    ...useStrictLines,
    trimmedCode,
    `}${bindThis}(${args}));`,
    "",
  ];

  const result: {
    code: string;
    sourceMap?: any;
  } = {
    code: lines.join("\n"),
  };

  if (sourceMapOptions && options.generateSourceMap !== false) {
    result.sourceMap = generateSourceMap(code, options, sourceMapOptions);
  }

  return result;
}

function getArgsAndParams(options: Options) {
  const args = options.args || options.params || [];
  const params = options.params || options.args || [];

  return {
    args: args.join(", "),
    params: params.join(", "),
  };
}

function generateSourceMap(
  originalCode: string,
  options: Options,
  sourceMapOptions: any
) {
  // We don't care about trailing lines for the mapping
  const code = originalCode.trimRight();

  const sourceMapGenerator = new SourceMapGenerator({
    file: sourceMapOptions.fileName,
  });

  // We have at least one line of positive offset because of the start of the IIFE
  let linesOffset = 1;

  // Then we have optionally two more lines because of the "use strict"
  // and the empty line after that
  linesOffset += options.useStrict ? 2 : 0;

  // Then we have negative lines for the leading empty lines that are trimmed
  const leadingEmptyLines = ((code.match(/^\s+/) || [""])[0].match(/\n/g) || [])
    .length;
  linesOffset -= options.trimCode ? leadingEmptyLines : 0;

  // We add sourcemaps only for the non-empty lines.
  // So, we start the loop in the first non-empty line.
  // (The trailing empty lines are already trimmed.)
  const codeLines = (code.trimLeft().match(/\n/g) || []).length + 1;

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
