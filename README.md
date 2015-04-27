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

- `useStrict`: a boolean indicating whether to prepend a `"use strict";` directive (`true` by default)
- `trimCode`: a boolean indicating whether to remove leading & trailing whitespace from the code (`true` by default)
- `prependSemicolon`: a boolean indicating whether to prepend a semicolon as statement terminator before the IIFE (`true` by default)

```js
var gulp = require("gulp");
var iife = require("gulp-iife");

gulp.task("default", function() {
	return gulp.src("src/input.js")
		.pipe(iife({
            useStrict: false,
            trimCode: false,
            prependSemicolon: false
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
(function() {
var greeting = "Hello, World!";
console.log(greeting);

}());

```


## Formatting

In the spirit of Gulp plugins, *gulp-iife* does one thing and one thing only: adding wrapping IIFEs.

If you'd like the resulting code to be neatly indented or otherwise formatted, pipe the output to another Gulp plugin which formats the JavaScript code, such as [gulp-esformatter](https://github.com/sindresorhus/gulp-esformatter).
