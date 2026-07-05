# frozen_string_literal: true

# Typed models for the EuroRates SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Currency entity data model.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
Currency = Struct.new(
  :name,
  :symbol,
  keyword_init: true
)

# Request payload for Currency#list.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
CurrencyListMatch = Struct.new(
  :name,
  :symbol,
  keyword_init: true
)

# ExchangeRate entity data model.
class ExchangeRate
end

# Request payload for ExchangeRate#load.
class ExchangeRateLoadMatch
end

