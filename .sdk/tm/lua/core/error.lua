-- EuroRates SDK error

local EuroRatesError = {}
EuroRatesError.__index = EuroRatesError


function EuroRatesError.new(code, msg, ctx)
  local self = setmetatable({}, EuroRatesError)
  self.is_sdk_error = true
  self.sdk = "EuroRates"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function EuroRatesError:error()
  return self.msg
end


function EuroRatesError:__tostring()
  return self.msg
end


return EuroRatesError
