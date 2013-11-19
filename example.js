var linkify = require("./");
var text = linkify(
	"Visit http://foo.com! " +
	"And email me@me.com " +
	"<script>alert('xss!')</script>");
console.log(text);
