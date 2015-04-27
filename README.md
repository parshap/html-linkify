# html-linkify

Replace any links and emails found in your text with HTML anchor
elements and return properly escaped and safe HTML.

# Example

```js
var linkify = require("html-linkify");
var text = linkify(
	"Visit http://foo.com!\n" +
	"Email me@me.com\n" +
	"<script>alert('xss!')</script>");
console.log(text);
// -> Visit <a href="http://foo.com">http://foo.com</a>!
//    Email <a href="mailto:me@me.com">me@me.com</a>
//    &lt;script&gt;alert(&#39;xss!&#39;)&lt;/script&gt;
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
