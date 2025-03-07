"use strict";

const form = require("../plugin"),
	Request = require("serviceberry/src/Request"),
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
	const request = new Request(httpMocks.createRequest({
			url: "/",
			setEncoding: Function.prototype,
			connection: {
				encrypted: false
			}
		})),
		getContent = jasmine.createSpy("request.getContent").and.returnValue(body),
		proceed = jasmine.createSpy("request.proceed");

	return new Proxy(request, {
		get (target, name, receiver) {
			var value;

			if (name === "getContent") {
				value = getContent;
			} else if (name === "proceed") {
				value = proceed;
			} else {
				value = Reflect.get(target, name, receiver);
			}

			return value;
		}
	});
}

function createResponse (body) {
	var response = jasmine.createSpyObj("Response", [
		"getBody"
	]);

	response.getBody.and.returnValue(body);

	return response;
}
