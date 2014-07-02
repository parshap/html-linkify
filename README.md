# html-linkify

Replace any links and emails found in your text with HTML anchor
elements and return properly escaped and safe HTML.

# Example

```js
var linkify = require("html-linkify");
var text = linkify(
	"Visit http://foo.com! " +
	"And email me@me.com " +
	"<script>alert('xss!')</script>");
console.log(text);
// -> String with anchor element to `http://foo.com`, email mailto link to
//    `me@me.com`, and properly escaped "<script>" text
```

# API

## `linkify(text, [options])`

Replace any links found in the input text with anchor elements.

Options:

 * `options.attributes`: A mapping of attributes to be added to the
   generated anchor elements (in addition to *href*).
 * `options.escape`: Whether surrounding HTML tags should be escaped or not (default: `true`).

# Todo

 * Allow arbitrary user-definable replacing

# Installation 

```
npm install html-linkify
```
