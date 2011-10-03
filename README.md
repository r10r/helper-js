# About

helper.js is a minimal collection of outstanding useful javascript helper functions.
helper.js is not intended to be an alternative for javascript frameworks like [jQuery](http://jquery.com/),
[prototype](http://www.prototypejs.org/), etc. ...

[API documentation](http://rjenster.github.com/helper-js/doc/symbols/helper.html)

## Development

### Browser Compliance

Currently helper.js is tested with firefox-3 and chrome-12 only.

### Tasks

The **Rakefile** contains the tasks for minifying the javascript as well as
for generating the documentation. To run the tasks you have to use [rake](http://rake.rubyforge.org/).

### Definition of Done

- every function should be off outstanding interest.
- every function should be tested properly with unit and/or user acceptance tests
- every function should be documented properly using [JSDoc](http://code.google.com/p/jsdoc-toolkit/)

### Documentation

Documentation is done using JSDoc.

- [JSDoc Tag Reference](http://code.google.com/p/jsdoc-toolkit/wiki/TagReference)
- [JSDoc Codeview template](http://www.thebrightlines.com/article-data/downloads/codeview.1.2.zip)

You can generate the documentation for offline usage with the command `rake documentation`.
