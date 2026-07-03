-- ExchangeRate entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("euro-rates_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ExchangeRateEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ExchangeRate(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = exchange_rate_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "exchange_rate." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set EURORATES_TEST_EXCHANGE_RATE_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local exchange_rate_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.exchange_rate")))
    local exchange_rate_ref01_data = nil
    if #exchange_rate_ref01_data_raw > 0 then
      exchange_rate_ref01_data = helpers.to_map(exchange_rate_ref01_data_raw[1][2])
    end

    -- LOAD
    local exchange_rate_ref01_ent = client:ExchangeRate(nil)
    local exchange_rate_ref01_match_dt0 = {}
    local exchange_rate_ref01_data_dt0_loaded, err = exchange_rate_ref01_ent:load(exchange_rate_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(exchange_rate_ref01_data_dt0_loaded)

  end)
end)

function exchange_rate_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/exchange_rate/ExchangeRateTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read exchange_rate test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "exchange_rate01", "exchange_rate02", "exchange_rate03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("EURORATES_TEST_EXCHANGE_RATE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["EURORATES_TEST_EXCHANGE_RATE_ENTID"] = idmap,
    ["EURORATES_TEST_LIVE"] = "FALSE",
    ["EURORATES_TEST_EXPLAIN"] = "FALSE",
    ["EURORATES_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["EURORATES_TEST_EXCHANGE_RATE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["EURORATES_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["EURORATES_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["EURORATES_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["EURORATES_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
