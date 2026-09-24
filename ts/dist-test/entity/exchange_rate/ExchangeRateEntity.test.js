"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ExchangeRateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EURO_RATES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EURO_RATES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EuroRatesSDK.test();
        const ent = testsdk.ExchangeRate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EURO_RATES_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'exchange_rate.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "exchange_rate", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/rates", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "EUR", "k": "query", "n": "from", "or": "from", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "HKD,GBP,USD", "k": "query", "n": "to", "or": "to", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/rates", "q": { "exist": ["from", "to"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "rates" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "exchange_rate", "name__orig": "exchange_rate", "Name": "ExchangeRate", "name_": "exchange_rate", "name-": "exchange-rate", "NAME": "EXCHANGE_RATE", "index$": 1 }, { "active": true, "entity": "exchange_rate", "key$": "BasicExchangeRateFlow", "kind": "basic", "name": "BasicExchangeRateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "exchange_rate_ref01", "srcdatavar": "exchange_rate_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-exchange_rate_ref01" } }], "index$": 0 }] }, 'ExchangeRate', { "GET /api/rates": { "protocol": "http", "operationId": "56d2fdecaee833415819830b15ab7d8c", "responses": { "200": { "description": "Successful response. Returns either a single currency rate or multiple currency rates.", "content": { "application/json": { "schema": { "oneOf": [{ "properties": { "from": { "type": "string", "example": "EUR" }, "rates": { "properties": { "HKD": { "properties": { "rate": { "type": "number", "example": 0.8535 }, "date": { "type": "string", "example": "2025-06-26" } }, "type": "object" }, "GBP": { "properties": { "rate": { "type": "number", "example": 9.1803 }, "date": { "type": "string", "example": "2025-06-26" } }, "type": "object" }, "USD": { "properties": { "rate": { "type": "number", "example": 1.1695 }, "date": { "type": "string", "example": "2025-06-26" } }, "type": "object" } }, "type": "object" }, "source": { "type": "string", "example": "European Central Bank (ECB)" } }, "type": "object" }, { "properties": { "from": { "type": "string", "example": "EUR" }, "to": { "type": "string", "example": "USD" }, "rate": { "type": "number", "example": 1.0895 }, "date": { "type": "string", "example": "2025-06-26" }, "source": { "type": "string", "example": "European Central Bank (ECB)" } }, "type": "object" }] } } } }, "400": { "description": "Bad Request", "content": { "application/json": { "schema": { "oneOf": [{ "properties": { "error": { "type": "string", "example": "Invalid or missing parameters" } }, "type": "object" }, { "properties": { "error": { "type": "string", "example": "Only EUR as base currency is supported by the ECB" } }, "type": "object" }] } } } }, "404": { "description": "No data", "content": { "application/json": { "schema": {} } } } }, "parameters": [{ "name": "from", "in": "query", "description": "Base currency (only EUR supported)", "required": true, "schema": { "type": "string", "example": "EUR" }, "example": "EUR", "index$": 0 }, { "name": "to", "in": "query", "description": "Target currency or comma-separated list of currencies", "required": true, "schema": { "type": "string", "example": "HKD,GBP,USD" }, "example": "HKD,GBP,USD", "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let exchange_rate_ref01_data = Object.values(setup.data.existing.exchange_rate)[0];
        // LOAD
        const exchange_rate_ref01_ent = client.ExchangeRate();
        const exchange_rate_ref01_match_dt0 = {};
        const exchange_rate_ref01_data_dt0 = (await exchange_rate_ref01_ent.load(exchange_rate_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != exchange_rate_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/exchange_rate/ExchangeRateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EuroRatesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['exchange_rate01', 'exchange_rate02', 'exchange_rate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EURO_RATES_TEST_EXCHANGE_RATE_ENTID': idmap,
        'EURO_RATES_TEST_LIVE': 'FALSE',
        'EURO_RATES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['EURO_RATES_TEST_EXCHANGE_RATE_ENTID'];
    const live = 'TRUE' === env.EURO_RATES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EURO_RATES_TEST_EXCHANGE_RATE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.EuroRatesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.EURO_RATES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ExchangeRateEntity.test.js.map