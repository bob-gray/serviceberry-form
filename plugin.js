"use strict";

const querystring = require("querystring");

module.exports = {
	contentType: "application/x-www-form-urlencoded",

	deserialize (request) {
		return querystring.parse(request.getContent());
	}
};