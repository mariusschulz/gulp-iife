var assert = require("chai").assert;
var iife = require("../lib/iife");

describe("IIFE", function() {
    describe("#surround()", function() {
        it("should be a function", function() {
            assert.typeOf(iife.surround, "function");
        });

        it("should return a string", function() {
            assert.typeOf(iife.surround(""), "string");
        });
    });
});
