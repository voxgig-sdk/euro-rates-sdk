# EuroRates SDK utility: prepare_body
require_relative 'media'
module EuroRatesUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return EuroRatesUtilities.raw_body(ctx.reqdata) if EuroRatesUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
