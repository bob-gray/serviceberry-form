"use strict";

const {URLSearchParams} = require("url"),
	querystring = require("querystring");

module.exports = {
	contentType: "application/x-www-form-urlencoded",

	serialize (request, response) {
		var body = response.getBody(),
			content = new URLSearchParams(body).toString();

		request.proceed(content);
	},

	deserialize (request) {
		return querystring.parse(request.getContent());
	}
};
