var assert = require("chai").assert;
var iife = require("../../lib/iife");

describe("IIFE", function() {
    var code = "var x = 1;\n\n\n";

    describe("#surround()", function() {
        it("should be a function", function() {
            assert.typeOf(iife.surround, "function");
        });

        it("should return a string", function() {
            assert.typeOf(iife.surround(""), "string");
        });

        it("should apply the correct defaults", function() {
            const expected = `(function() {
"use strict";

var x = 1;
}());
`;

            assert.equal(iife.surround(code), expected);
        });

        it("should not add a \"use strict\" directive when \"useStrict\" is false", function() {
            const expected = `(function() {
var x = 1;
}());
`;

            assert.equal(iife.surround(code, { useStrict: false }), expected);
        });
    });
});
