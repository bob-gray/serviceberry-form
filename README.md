serviceberry-form
=================

[![CircleCI](https://circleci.com/gh/bob-gray/serviceberry-form.svg?style=svg)](https://circleci.com/gh/bob-gray/serviceberry-form)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5697c352f89c0bbe79f3/test_coverage)](https://codeclimate.com/github/bob-gray/serviceberry-form/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5697c352f89c0bbe79f3/maintainability)](https://codeclimate.com/github/bob-gray/serviceberry-form/maintainability)
[![npm version](https://badge.fury.io/js/serviceberry-json.svg)](https://badge.fury.io/js/serviceberry-json)

URL encoded form serialization plugin for [Serviceberry](https://serviceberry.js.org).

API
---

### contentType

`application/x-www-form-urlencoded`

### deserialize(request, response)

Transforms the request content into the request body

### serialize(request, response)

Transforms the response body into the response content.

*Serializing a response body as a form encoded string doesn't seem particularly
useful but it felt rather asymmetrical for this plugin to only support deserialization.*

*A known serialization quirk is that arrays are serialized as list and not duplicated keys*
