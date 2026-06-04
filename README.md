# EuroRates SDK

Free EUR-centric foreign exchange rates sourced from the European Central Bank

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Exchange Rate API

[Exchange Rate API](https://api.exchangerate.host) is a REST service that exposes current and historical foreign exchange rates, with rates derived from the [European Central Bank](https://www.ecb.europa.eu/) and other financial data providers. The service is run by [APILayer](https://apilayer.com/).

What you get from the API:
- Latest exchange rates for EUR against a list of supported currencies
- Cross-rate lookups starting from a chosen base currency
- A directory of supported currency symbols
- Historical end-of-day rates over a date range, with selectable frequency

Operational notes: historical rates are end-of-day values timestamped at 23:59 GMT, with roughly 19 years of history available. The free tier is capped at 100 requests per month, and response headers report current rate-limit usage. The community catalogue at [freepublicapis.com](https://freepublicapis.com/euro-rates-api) notes that CORS is disabled across endpoints.

## Try it

**TypeScript**
```bash
npm install euro-rates
```

**Python**
```bash
pip install euro-rates-sdk
```

**PHP**
```bash
composer require voxgig/euro-rates-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/euro-rates-sdk/go
```

**Ruby**
```bash
gem install euro-rates-sdk
```

**Lua**
```bash
luarocks install euro-rates-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { EuroRatesSDK } from 'euro-rates'

const client = new EuroRatesSDK({})

// List all currencys
const currencys = await client.Currency().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o euro-rates-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "euro-rates": {
      "command": "/abs/path/to/euro-rates-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Currency** | A supported currency, typically identified by its ISO 4217 code, used as the base or target of a rate lookup. | `/api/all-currencies` |
| **ExchangeRate** | A foreign exchange rate quote between two currencies, available either as the latest value or as a historical end-of-day series. | `/api/rates` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from eurorates_sdk import EuroRatesSDK

client = EuroRatesSDK({})

# List all currencys
currencys, err = client.Currency(None).list(None, None)
```

### PHP

```php
<?php
require_once 'eurorates_sdk.php';

$client = new EuroRatesSDK([]);

// List all currencys
[$currencys, $err] = $client->Currency(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/euro-rates-sdk/go"

client := sdk.NewEuroRatesSDK(map[string]any{})

// List all currencys
currencys, err := client.Currency(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "EuroRates_sdk"

client = EuroRatesSDK.new({})

# List all currencys
currencys, err = client.Currency(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("euro-rates_sdk")

local client = sdk.new({})

-- List all currencys
local currencys, err = client:Currency(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = EuroRatesSDK.test()
const result = await client.Currency().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = EuroRatesSDK.test(None, None)
result, err = client.Currency(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = EuroRatesSDK::test(null, null);
[$result, $err] = $client->Currency(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Currency(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = EuroRatesSDK.test(nil, nil)
result, err = client.Currency(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Currency(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Exchange Rate API

- Upstream: [https://api.exchangerate.host](https://api.exchangerate.host)
- API docs: [https://www.exchangerate.host](https://www.exchangerate.host)

- Operated by [exchangerate.host](https://www.exchangerate.host), an APILayer product.
- Underlying ECB reference rates are public information from the European Central Bank.
- No explicit attribution requirement is documented on the catalogue page; review the provider's Terms of Service before redistribution.
- Usage is subject to the API plan you sign up for (free and paid tiers).

---

Generated from the Exchange Rate API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
