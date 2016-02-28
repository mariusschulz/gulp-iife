var assert = require("chai").assert;
var iife = require("../../lib/iife");
var SourceMapGenerator = require('source-map').SourceMapGenerator;

describe("IIFE", function() {
    var code = "var x = 1;\n\n";

    describe("#surround()", function() {
        it("should be a function", function() {
            assert.typeOf(iife.surround, "function");
        });

        it("should return an object with a string", function() {
            assert.typeOf(iife.surround("").code, "string");
        });

        it("should apply the correct defaults", function() {
            const expected = `;(function() {
"use strict";

var x = 1;
}());
`;

            assert.equal(iife.surround(code).code, expected);
        });

        it("should generate correct sourcemaps for default options", function() {
            var fileName = "whatever.js";
            var options = {};
            var result = iife.surround(code, options, { fileName });

            var expectedMap = new SourceMapGenerator({ file: fileName });

            expectedMap.addMapping({
                source: fileName,
                original: {
                    line: 1,
                    column: 0
                },
                generated: {
                    line: 4,
                    column: 0
                }
            });

            assert.equal(result.sourceMap, expectedMap.toString());
        });

        it("should add a \"use strict\" directive when \"useStrict\" is true", function() {
            const expected = `;(function() {
"use strict";

var x = 1;
}());
`;

            assert.equal(iife.surround(code, { useStrict: true }).code, expected);
        });

        it("should not add a \"use strict\" directive when \"useStrict\" is false", function() {
            const expected = `;(function() {
var x = 1;
}());
`;

            assert.equal(iife.surround(code, { useStrict: false }).code, expected);
        });

        it("should trim the code when \"trimCode\" is true", function() {
            const expected = `;(function() {
"use strict";

var x = 1;
}());
`;

            assert.equal(iife.surround(code, { trimCode: true }).code, expected);
        });

        it("should not trim the code when \"trimCode\" is false", function() {
            const expected = `;(function() {
"use strict";

var x = 1;


}());
`;

            assert.equal(iife.surround(code, { trimCode: false }).code, expected);
        });

        it("should prepend a semicolon when \"prependSemicolon\" is true", function() {
            const expected = `;(function() {
"use strict";

var x = 1;
}());
`;

            assert.equal(iife.surround(code, { prependSemicolon: true }).code, expected);
        });

        it("should not prepend a semicolon when \"prependSemicolon\" is false", function() {
            const expected = `(function() {
"use strict";

var x = 1;
}());
`;

            assert.equal(iife.surround(code, { prependSemicolon: false }).code, expected);
        });

        it("should add \".bind(this)\" when \"bindThis\" is true", function() {
            const expected = `;(function() {
"use strict";

var x = 1;
}.bind(this)());
`;

            assert.equal(iife.surround(code, { bindThis: true }).code, expected);
        });

        it("should not add \".bind(this)\" when \"bindThis\" is false", function() {
            const expected = `;(function() {
"use strict";

var x = 1;
}());
`;

            assert.equal(iife.surround(code, { bindThis: false }).code, expected);
        });

        it("should add the arguments and parameters specified in \"args\" and \"params\"", function() {
            const expected = `;(function($, undefined) {
"use strict";

var x = 1;
}(jQuery));
`;

            let options = {
                args: ["jQuery"],
                params: ["$", "undefined"]
            };

            assert.equal(iife.surround(code, options).code, expected);
        });

        it("should use \"params\" values for \"args\" if \"args\" is missing", function() {
            const expected = `;(function(window) {
"use strict";

var x = 1;
}(window));
`;

            let options = {
                params: ["window"]
            };

            assert.equal(iife.surround(code, options).code, expected);
        });

        it("should use \"args\" values for \"params\" if \"params\" is missing", function() {
            const expected = `;(function(window) {
"use strict";

var x = 1;
}(window));
`;

            let options = {
                args: ["window"]
            };

            assert.equal(iife.surround(code, options).code, expected);
        });
    });
});
