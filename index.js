// Takes plain text and replaces links with HTML anchor elements. Based on
// https://github.com/thejh/node-linkify
"use strict";

// Link regex
// See http://daringfireball.net/2010/07/improved_regex_for_matching_urls
var rLink = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

// Email regex
var rEmail = /\b(([a-zA-Z0-9\-\_\.])+(\+[a-zA-Z0-9]*)?@[a-zA-Z\_\-]+?(\.[a-zA-Z]{2,6})+)/gim;

var escape = require("html-escape");

module.exports = function(text, options) {
	if ( ! options) options = {};

	var retval = "", cur = 0, match;

	var escapeFn = options.escape === false ? function(str) { return str; } : escape;

	while (match = rLink.exec(text)) {
		retval += escapeFn(text.slice(cur, match.index));
		retval += anchor(match[0], options.attributes);
		cur = rLink.lastIndex;
	}

	retval += escapeFn(text.slice(cur));
	retval = emails(retval, options.attributes);

	return retval;
};

// Return an anchor element for the url
function anchor(url, attrs) {
	var text = escape(url),
		href = url;

	// Ensure protocol at beginning of url
	if (!/^[a-zA-Z]{1,6}:/.test(href)) {
		href = 'http://' + href;
	}

	var attrsString = combine({ href: href }, attrs);

	return "<a " + attrsString + ">" + text + "</a>";
}

// combine attrs objects into single string
function combine() {
	return Array.prototype.slice.call(arguments)
		.map(attributes)
		.filter(Boolean)
		.join(" ");
}

// Replace emails in text with anchor elements
function emails(text, attrs) {
	var attrsString = attributes(attrs);

	return text.replace(rEmail, function(match, email) {
		var elAttrs = attributes({ href: "mailto:" + email });
		if (attrsString) {
			elAttrs += " " + attrsString;
		}

		return "<a " + elAttrs + ">" + escape(email) + "</a>";
	});
}

function attributes(attrs) {
	if ( ! attrs) return "";
	return Object.keys(attrs).map(function(name) {
		var value = attrs[name];
		return escape(name) + "=\"" + escape(value) + "\"";
	}).join(" ");
}
