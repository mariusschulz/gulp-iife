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

- `useStrict`
    - A boolean indicating whether to prepend a `"use strict";` directive.
    - `true` by default
- `trimCode`
    - A boolean indicating whether to remove leading & trailing whitespace from the code.
    - `true` by default
- `prependSemicolon`
    - A boolean indicating whether to prepend a semicolon as statement terminator before the IIFE.
    - `true` by default
- `bindThis`
    - A boolean indicating whether to append `.bind(this)` to the IIFE. Setting this value to `true` makes the surrounding global object available to the function, which is usually not the case in strict mode.
    - `false` by default
- `args`
	- An array of arguments to be passed into the IIFE. You can optionally modify the corresponding parameters through `params`.
	- ` ` by default
- `params`
	- An array of parameters to be used inside the IIFE. This is optional when using `args`, otherwise its variables will be used instead.
	- ` ` by default

```js
var gulp = require("gulp");
var iife = require("gulp-iife");

gulp.task("default", function() {
	return gulp.src("src/input.js")
		.pipe(iife({
            useStrict: false,
            trimCode: false,
            prependSemicolon: false,
			params: ['$', 'window', 'document', 'undefined'],
			args: ['jQuery', 'window', 'document']
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
(function($, window, document, undefined) {
var greeting = "Hello, World!";
console.log(greeting);

}(jQuery, window, document));

```


## Formatting

In the spirit of Gulp plugins, *gulp-iife* does one thing and one thing only: adding wrapping IIFEs.

If you'd like the resulting code to be neatly indented or otherwise formatted, pipe the output to another Gulp plugin which formats the JavaScript code, such as [gulp-esformatter](https://github.com/sindresorhus/gulp-esformatter).


## Changelog

The changelog can be found in [CHANGELOG.md](https://github.com/mariusschulz/gulp-iife/blob/master/CHANGELOG.md).
