// Takes plain text and replaces links with HTML anchor elements. Based on
// https://github.com/thejh/node-linkify and
// http://daringfireball.net/2010/07/improved_regex_for_matching_urls

"use strict";

var r = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

var escape = require("html-escape");

module.exports = function(text, options) {
	if ( ! options) options = {};

	var retval = "", cur = 0, match;

	while (match = r.exec(text)) {
		retval += escape(text.slice(cur, match.index));
		retval += anchor(match[0], options.attributes);
		cur = r.lastIndex;
	}

	retval += escape(text.slice(cur));

	retval = emailReplace(retval);

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

	var attrsString = [attributes({ href: href }), attributes(attrs)]
		.filter(Boolean)
		.join(" ");

	return "<a "+ attrsString + ">" + text + "</a>";
}

function emailReplace(text, attrs) {
	var emailRegex = /(([a-zA-Z0-9\-\_\.])+(\+[a-zA-Z0-9]*)?@[a-zA-Z\_\-]+?(\.[a-zA-Z]{2,6})+)/gim
		, attrsString = attributes(attrs)
		, emailTemplate = '<a' + (attrsString ? ' ' + attrsString : '') + ' href="mailto:$1">$1</a>';

  return text.replace(emailRegex, emailTemplate);
}

function attributes(attrs) {
	if ( ! attrs) return "";
	return Object.keys(attrs).map(function(name) {
		var value = attrs[name];
		return escape(name) + "=\"" + escape(value) + "\"";
	}).join(" ");
}
