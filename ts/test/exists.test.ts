
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EuroRatesSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EuroRatesSDK.test()
    equal(null !== testsdk, true)
  })

})
