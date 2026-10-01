"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "currency",
        "accessor": "Currency",
        "op": "list",
        "method": "GET",
        "path": "/api/all-currencies",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
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
        "query": [
            "from",
            "to"
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
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map