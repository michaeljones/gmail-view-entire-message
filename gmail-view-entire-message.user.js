// ==UserScript==
// @name          gmail-view-entire-message
// @description   Inserts a "View Entire Message" link at the top of email that are clipped in gmail
// @include https://mail.google.tld/mail/*
// @include http://mail.google.tld/mail/*
// @include https://mail.google.tld/a/*
// @include http://mail.google.tld/a/*
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// Executed onload

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', init)
  }
}, true);


function init(gmail)
{
	gmail.registerViewChangeCallback(function (viewType) {

		var root = gmail.getActiveViewElement();
		var node = jQuery("a:contains('View entire message')", root);	

		if ( ! node ) return;

		var parent_ = node.parent();

		var url = node.attr("href");

		if ( ! parent_ ) return;

		parent_.prepend('This message has been clipped: <a href="' + url + '" target="_blank">View entire message</a>');
	});
}


