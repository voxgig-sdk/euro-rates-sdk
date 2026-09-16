

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EuroRatesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ExchangeRateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EURO_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('EURO_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EuroRatesSDK.test()
    const ent = testsdk.ExchangeRate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EURO_RATES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'exchange_rate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"exchange_rate","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"EUR","kind":"query","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"HKD,GBP,USD","kind":"query","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/rates","json":"{\"operationId\":\"56d2fdecaee833415819830b15ab7d8c\",\"parameters\":[{\"description\":\"Base currency (only EUR supported)\",\"example\":\"EUR\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"example\":\"EUR\",\"type\":\"string\"}},{\"description\":\"Target currency or comma-separated list of currencies\",\"example\":\"HKD,GBP,USD\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"example\":\"HKD,GBP,USD\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"from\":{\"example\":\"EUR\",\"type\":\"string\"},\"rates\":{\"properties\":{\"GBP\":{\"properties\":{\"date\":{\"example\":\"2025-06-26\",\"type\":\"string\"},\"rate\":{\"example\":9.1803,\"type\":\"number\"}},\"type\":\"object\"},\"HKD\":{\"properties\":{\"date\":{\"example\":\"2025-06-26\",\"type\":\"string\"},\"rate\":{\"example\":0.8535,\"type\":\"number\"}},\"type\":\"object\"},\"USD\":{\"properties\":{\"date\":{\"example\":\"2025-06-26\",\"type\":\"string\"},\"rate\":{\"example\":1.1695,\"type\":\"number\"}},\"type\":\"object\"}},\"type\":\"object\"},\"source\":{\"example\":\"European Central Bank (ECB)\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"date\":{\"example\":\"2025-06-26\",\"type\":\"string\"},\"from\":{\"example\":\"EUR\",\"type\":\"string\"},\"rate\":{\"example\":1.0895,\"type\":\"number\"},\"source\":{\"example\":\"European Central Bank (ECB)\",\"type\":\"string\"},\"to\":{\"example\":\"USD\",\"type\":\"string\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response. Returns either a single currency rate or multiple currency rates.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"error\":{\"example\":\"Invalid or missing parameters\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"error\":{\"example\":\"Only EUR as base currency is supported by the ECB\",\"type\":\"string\"}},\"type\":\"object\"}]}}},\"description\":\"Bad Request\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{}}},\"description\":\"No data\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/rates","segments":[{"lit":"api"},{"lit":"rates"}],"select":{"exist":["from","to"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"exchange_rate","name__orig":"exchange_rate","Name":"ExchangeRate","name_":"exchange_rate","name-":"exchange-rate","NAME":"EXCHANGE_RATE","index$":1}, {"active":true,"entity":"exchange_rate","key$":"BasicExchangeRateFlow","kind":"basic","name":"BasicExchangeRateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"exchange_rate_ref01","srcdatavar":"exchange_rate_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-exchange_rate_ref01"}}],"index$":0}]}, 'ExchangeRate')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let exchange_rate_ref01_data = Object.values(setup.data.existing.exchange_rate)[0] as any

    // LOAD
    const exchange_rate_ref01_ent = client.ExchangeRate()
    const exchange_rate_ref01_match_dt0: any = {}
    const exchange_rate_ref01_data_dt0 = (await exchange_rate_ref01_ent.load(exchange_rate_ref01_match_dt0)).data()
    assert(null != exchange_rate_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/exchange_rate/ExchangeRateTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = EuroRatesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['exchange_rate01','exchange_rate02','exchange_rate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EURO_RATES_TEST_EXCHANGE_RATE_ENTID': idmap,
    'EURO_RATES_TEST_LIVE': 'FALSE',
    'EURO_RATES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['EURO_RATES_TEST_EXCHANGE_RATE_ENTID']

  const live = 'TRUE' === env.EURO_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EURO_RATES_TEST_EXCHANGE_RATE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new EuroRatesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
