-- EuroRates SDK ExchangeRate entity

local vs = require("utility.struct.struct")
local helpers = require("core.helpers")

local ExchangeRateEntity = {}
ExchangeRateEntity.__index = ExchangeRateEntity


function ExchangeRateEntity.new(client, entopts)
  entopts = entopts or {}
  if entopts["active"] == nil then
    entopts["active"] = true
  elseif entopts["active"] == false then
    -- keep false
  else
    entopts["active"] = true
  end

  local self = setmetatable({}, ExchangeRateEntity)
  self._name = "exchange_rate"
  self._client = client
  self._utility = client:get_utility()
  self._entopts = entopts
  self._data = {}
  self._match = {}

  self._entctx = self._utility.make_context({
    entity = self,
    entopts = entopts,
  }, client:get_root_ctx())

  self._utility.feature_hook(self._entctx, "PostConstructEntity")

  return self
end


function ExchangeRateEntity:get_name()
  return self._name
end


function ExchangeRateEntity:make()
  local opts = {}
  for k, v in pairs(self._entopts) do
    opts[k] = v
  end
  return ExchangeRateEntity.new(self._client, opts)
end


function ExchangeRateEntity:data_set(args)
  if args ~= nil then
    self._data = helpers.to_map(vs.clone(args)) or {}
    self._utility.feature_hook(self._entctx, "SetData")
  end
end


function ExchangeRateEntity:data_get()
  self._utility.feature_hook(self._entctx, "GetData")
  return vs.clone(self._data)
end


function ExchangeRateEntity:match_set(args)
  if args ~= nil then
    self._match = helpers.to_map(vs.clone(args)) or {}
    self._utility.feature_hook(self._entctx, "SetMatch")
  end
end


function ExchangeRateEntity:match_get()
  self._utility.feature_hook(self._entctx, "GetMatch")
  return vs.clone(self._match)
end



---@param reqmatch ExchangeRateLoadMatch
---@param ctrl? table
---@return ExchangeRate
---@return string? err
function ExchangeRateEntity:load(reqmatch, ctrl)
  local utility = self._utility
  local ctx = utility.make_context({
    opname = "load",
    ctrl = ctrl,
    match = self._match,
    data = self._data,
    reqmatch = reqmatch,
  }, self._entctx)

  return self:_run_op(ctx, function()
    if ctx.result ~= nil then
      if ctx.result.resmatch ~= nil then
        self._match = ctx.result.resmatch
      end
      if ctx.result.resdata ~= nil then
        self._data = helpers.to_map(vs.clone(ctx.result.resdata)) or {}
      end
    end
  end)
end












function ExchangeRateEntity:_run_op(ctx, post_done)
  local utility = self._utility

  -- #PrePoint-Hook

  local point, err = utility.make_point(ctx)
  ctx.out["point"] = point
  if err ~= nil then
    return utility.make_error(ctx, err)
  end

  -- #PreSpec-Hook

  local spec
  spec, err = utility.make_spec(ctx)
  ctx.out["spec"] = spec
  if err ~= nil then
    return utility.make_error(ctx, err)
  end

  -- #PreRequest-Hook

  local resp
  resp, err = utility.make_request(ctx)
  ctx.out["request"] = resp
  if err ~= nil then
    return utility.make_error(ctx, err)
  end

  -- #PreResponse-Hook

  local resp2
  resp2, err = utility.make_response(ctx)
  ctx.out["response"] = resp2
  if err ~= nil then
    return utility.make_error(ctx, err)
  end

  -- #PreResult-Hook

  local result
  result, err = utility.make_result(ctx)
  ctx.out["result"] = result
  if err ~= nil then
    return utility.make_error(ctx, err)
  end

  -- #PreDone-Hook

  post_done()

  return utility.done(ctx)
end


return ExchangeRateEntity
