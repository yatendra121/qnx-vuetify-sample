# Server Contract

What the components send and the response shapes they expect. Requests go through the axios instance you set with [`AxiosPlugin.setInstance`](/guide/installation/#set-up-the-app).

## VqDataTable

**Request:** the method from the `method` prop, with this query:

```
users?search=abc&page=1&itemsPerPage=10&sortBy[0][name]=asc
```

The brackets are percent-encoded on the wire. Filter values come first, then `page` and `itemsPerPage`, then one `sortBy[n][column]=asc|desc` for each sorted column.

::: warning Default sort
`sortBy` defaults to `name` ascending, so the request always sorts by `name` unless you set the prop, even if your data has no such column.
:::

**Response:**

```json
{
  "data": {
    "data": [{ "id": 1, "name": "Asha" }],
    "total": 37
  }
}
```

## VqList

**Request:** always `GET`:

```
posts?page=1&page_size=10&search=abc
```

**Response:** the same shape as `VqDataTable`. `finished` becomes `true` once `page_size × page` reaches `total`.

## VqAutocomplete

**Request:** when `action` is set, the component makes one request with axios's default method, `GET`, with no query.

**Response:** the options are read from `data.data`:

```json
{
  "data": {
    "data": [{ "id": 1, "name": "India" }]
  }
}
```

## VqForm

**Request:** the `method` prop (default `POST`) with the form values as a JSON body. With `form-data`, the body is `multipart/form-data` instead.

**Success (2xx):** any body. `submited-success` wraps it in an `ApiResponse`:

```json
{
  "message": "Saved",
  "data": { "id": 1 }
}
```

| `ApiResponse` method | Returns |
|----------------------|---------|
| `getMessage()` | `message` |
| `getData()` | `data` |
| `getErrors()` | `errors` |
| `getError()` | `error` |
| `getErrorCode()` | `errorCode` |

**Validation failure (`400` or `422`):** `errors` is keyed by field name.

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": "This email is already registered."
  }
}
```

### multipart/form-data values

With `form-data`, nested values use bracket keys such as `address[city]` and `tags[0]`. `null`, `undefined`, `""`, `0`, and `false` are all left out of the request, so an unchecked checkbox or a quantity of `0` never reaches the server. Use a JSON body if you need to send them.
