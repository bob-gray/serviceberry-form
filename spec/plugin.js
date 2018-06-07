"use strict";

const form = require("../plugin"),
	Request = require("serviceberry/src/Request"),
	{HttpError} = require("serviceberry"),
	httpMocks = require("node-mocks-http");

describe("serviceberry-form", () => {
	var body,
		request,
		response;

	beforeEach(() => {
		body = {
			foo: "baz",
			hello: ["1", "2", "3"],
			world: "null",
			awesome: "true"
		};

		request = createRequest("foo=baz&hello=1&hello=2&hello=3&world=null&awesome=true");
		response = createResponse(body);
	});

	it("should have a form content type", () => {
		expect(form.contentType).toBe("application/x-www-form-urlencoded");
	});

	it("should deserialize request body", () => {
		expect(form.deserialize(request)).toEqual(body);
	});

	it("should return an empty object if request content is empty", () => {
		request.getContent.and.returnValue("");

		expect(form.deserialize(request)).toEqual({});
	});

	it("should serialize response body", () => {
		form.serialize(request, response);

		expect(request.proceed).toHaveBeenCalledWith("foo=baz&hello=1%2C2%2C3&world=null&awesome=true");
	});

	it("should proceed with [empty string] if response body is undefined", () => {
		response.getBody.and.returnValue(undefined);
		form.serialize(request, response);

		expect(request.proceed).toHaveBeenCalledWith("");
	});

	it("should proceed with [empty string] if response body is empty", () => {
		response.getBody.and.returnValue({});
		form.serialize(request, response);

		expect(request.proceed).toHaveBeenCalledWith("");
	});
});

function createRequest (body) {
	var incomingMessage = httpMocks.createRequest({
			url: "/"
		}),
		request;

	incomingMessage.setEncoding = Function.prototype;
	request = new Request(incomingMessage);
	request.getContent = jasmine.createSpy("request.getContent")
		.and.returnValue(body);
	request.proceed = jasmine.createSpy("request.proceed");

	return request;
}

function createResponse (body) {
	var response = jasmine.createSpyObj("Response", [
		"getBody"
	]);

	response.getBody.and.returnValue(body);

	return response;
}
