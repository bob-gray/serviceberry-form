serviceberry-form
=================

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
