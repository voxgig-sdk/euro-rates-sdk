# EuroRates SDK utility: feature_add
module EuroRatesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
