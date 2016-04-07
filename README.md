# gulp-iife

A Gulp plugin for wrapping JavaScript code within immediately invoked function expressions (IIFEs).


## Install

```
$ npm install --save-dev gulp-iife
```


## Usage

```js
var gulp = require("gulp");
var iife = require("gulp-iife");

gulp.task("default", function() {
    return gulp.src("src/input.js")
        .pipe(iife())
        .pipe(gulp.dest("dist"));
});
```

Input file:

```js
var greeting = "Hello, World!";
console.log(greeting);
```

Output file:

```js
;(function() {
"use strict";

var greeting = "Hello, World!";
console.log(greeting);
}());
```


## Options

You can configure the following options:

- [`useStrict`](#usestrict)
- [`trimCode`](#trimcode)
- [`prependSemicolon`](#prependsemicolon)
- [`bindThis`](#bindthis)
- [`params`](#params)
- [`args`](#args)

Here's an example specifying all available options:

```js
var gulp = require("gulp");
var iife = require("gulp-iife");

gulp.task("default", function() {
    return gulp.src("src/input.js")
        .pipe(iife({
            useStrict: true,
            trimCode: true,
            prependSemicolon: false,
            bindThis: false,
            params: ["window", "document", "$", "undefined"],
            args: ["window", "document", "jQuery"]
        }))
        .pipe(gulp.dest("dist"));
});
```

Input file:

```js
var greeting = "Hello, World!";
console.log(greeting);
```

Output file:

```js
(function(window, document, $, undefined) {
"use strict";

var greeting = "Hello, World!";
console.log(greeting);
}(window, document, jQuery));
```


### `useStrict`

A boolean indicating whether to prepend a `"use strict";` directive to the function body.

- **Default**: `true`


### `trimCode`

A boolean indicating whether to remove leading & trailing whitespace from the code.

- **Default**: `true`


### `prependSemicolon`

A boolean indicating whether to prepend a semicolon as statement terminator before the IIFE.

- **Default**: `true`


### `bindThis`

A boolean indicating whether to append `.bind(this)` to the IIFE. Setting this value to `true` makes the surrounding global object available to the function, which is usually not the case in strict mode.

- **Default**: `false`


### `params`

An array of parameter names to be accepted by the IIFE. If the `args` option is not specified, the same identifiers will be passed as arguments of the function call.

- **Default**: none


### `args`

An array of argument names to be passed into the IIFE. If the `params` option is not specified, the parameters of the function will have the same names as the arguments passed.

- **Default**: none


## Source Maps

*gulp-iife* supports source maps, which means you can use it like this:

```js
var gulp = require("gulp");
var iife = require("../gulp-iife/lib");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("default", function() {
    return gulp.src("src/input.js")
        .pipe(sourcemaps.init())
        .pipe(iife({ }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./built"));
});
```


## Changelog

The changelog can be found in [CHANGELOG.md](https://github.com/mariusschulz/gulp-iife/blob/master/CHANGELOG.md).


## Formatting

In the spirit of Gulp plugins, *gulp-iife* does one thing and one thing only: adding wrapping IIFEs.

If you'd like the resulting code to be neatly indented or otherwise formatted, pipe the output to another Gulp plugin which formats the JavaScript code, such as [gulp-esformatter](https://github.com/sindresorhus/gulp-esformatter).
