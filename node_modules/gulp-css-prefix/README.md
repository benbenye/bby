# gulp-css-prefix

Simple gulp plugin/wrapper around [css-prefix](https://github.com/substack/css-prefix)

## Installation

```sh
npm install --save-dev gulp-css-prefix
```

## Usage

```js
var gulp = require('gulp'),
cssPrefix = require('gulp-css-prefix');

gulp.task('build-css', function() {
  return gulp.src('./static/css/*.css')
    .pipe(cssPrefix('RAWR-'))
    .pipe(gulp.dest('./dist/'))
});
```
### Options

See [css-prefix options](https://github.com/substack/css-prefix#insertprefixopts-src) as the record of truth.

For convenience:

* `prefix` - Insert this string before every class and id in the css source string src
* `elementClass` - add this class to all element identifiers
* `parentClass` - add an ancestor class to every rule
* `parentId` - add an ancestor id to every rule (not yet, [hopefully in v0.0.3](https://github.com/substack/css-prefix/pull/3))
