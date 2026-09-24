
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EuroRatesSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = EuroRatesSDK.test()
    equal(testsdk instanceof EuroRatesSDK, true,
      'EuroRatesSDK.test() must return a client synchronously')
  })

})
