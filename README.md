# html-linkify

Replace any links found in your text with HTML anchor elements.

Links are found using a "liberal, accurate" [regular
expression](http://daringfireball.net/2010/07/improved_regex_for_matching_urls).

All input (including attributes for the anchor element) are escaped,
**guaranteeing the output to be safe** (containing no reserved
characters).

# Example

```js
var linkify = require("html-linkify");
linkify("Visit me at http://foo.com!<script>");
// -> String with anchor element to `http://foo.com` and properly
//    escaped "<script>" text
```

# API

## `linkify(text, [options])`

Replace any URLs found in the input text with anchor elements linking to
the found URL.

Options:

 * `options.attributes`: A mapping of attributes to be added to the
   generated anchor elements (in addition to *href*).

# Todo

 * Allow arbitrary user-definable protocolsV

# Installation 

```
npm install html-linkify
```
