import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "currency",
    "accessor": "Currency",
    "op": "list",
    "method": "GET",
    "path": "/api/all-currencies",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "symbol": "USD",
        "name": "US Dollar"
      },
      {
        "symbol": "EUR",
        "name": "Euro"
      },
      {
        "symbol": "JPY",
        "name": "Japanese Yen"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "exchange_rate",
    "accessor": "ExchangeRate",
    "op": "load",
    "method": "GET",
    "path": "/api/rates",
    "args": [],
    "select": {
      "from": "EUR",
      "to": "HKD,GBP,USD"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "from",
      "to"
    ],
    "queryArgs": [
      {
        "name": "from",
        "wire": "from"
      },
      {
        "name": "to",
        "wire": "to"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "from": "EUR",
      "rates": {
        "HKD": {
          "rate": 0.8535,
          "date": "2025-06-26"
        },
        "GBP": {
          "rate": 9.1803,
          "date": "2025-06-26"
        },
        "USD": {
          "rate": 1.1695,
          "date": "2025-06-26"
        }
      },
      "source": "European Central Bank (ECB)"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
