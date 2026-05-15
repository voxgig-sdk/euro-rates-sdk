
import { Context } from './Context'


class EuroRatesError extends Error {

  isEuroRatesError = true

  sdk = 'EuroRates'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  EuroRatesError
}

