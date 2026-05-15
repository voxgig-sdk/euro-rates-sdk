# EuroRates SDK utility: make_context
require_relative '../core/context'
module EuroRatesUtilities
  MakeContext = ->(ctxmap, basectx) {
    EuroRatesContext.new(ctxmap, basectx)
  }
end
