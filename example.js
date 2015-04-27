var linkify = require("./");
var text = linkify(
	"Visit http://foo.com!\n" +
	"Email me@me.com\n" +
	"<script>alert('xss!')</script>");
console.log(text);
