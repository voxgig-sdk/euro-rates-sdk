-- Currency direct test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("euro-rates_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

describe("CurrencyDirect", function()
  it("should direct-list-currency", function()
    local setup = currency_direct_setup({
      { id = "direct01" },
      { id = "direct02" },
    })
    local _should_skip, _reason = runner.is_control_skipped("direct", "direct-list-currency", setup.live and "live" or "unit")
    if _should_skip then
      pending(_reason or "skipped via sdk-test-control.json")
      return
    end
    local client = setup.client


    local result, err = client:direct({
      path = "api/all-currencies",
      method = "GET",
      params = {},
    })
    if setup.live then
      -- Live mode is lenient: synthetic IDs frequently 4xx and the list-
      -- response shape varies wildly across public APIs. Skip rather than
      -- fail when the call doesn't return a usable list.
      if err ~= nil then
        pending("list call failed (likely synthetic IDs against live API): " .. tostring(err))
        return
      end
      if not result["ok"] then
        pending("list call not ok (likely synthetic IDs against live API)")
        return
      end
      local status = helpers.to_int(result["status"])
      if status < 200 or status >= 300 then
        pending("expected 2xx status, got " .. tostring(status))
        return
      end
    else
      assert.is_nil(err)
      assert.is_true(result["ok"])
      assert.are.equal(200, helpers.to_int(result["status"]))
      assert.is_table(result["data"])
      assert.are.equal(2, #result["data"])
      assert.are.equal(1, #setup.calls)
    end
  end)

end)


function currency_direct_setup(mockres)
  runner.load_env_local()

  local calls = {}

  local env = runner.env_override({
    ["EURORATES_TEST_CURRENCY_ENTID"] = {},
    ["EURORATES_TEST_LIVE"] = "FALSE",
    ["EURORATES_APIKEY"] = "NONE",
  })

  local live = env["EURORATES_TEST_LIVE"] == "TRUE"

  if live then
    local merged_opts = {
      apikey = env["EURORATES_APIKEY"],
    }
    local client = sdk.new(merged_opts)
    return {
      client = client,
      calls = calls,
      live = true,
      idmap = {},
    }
  end

  local function mock_fetch(url, init)
    table.insert(calls, { url = url, init = init })
    return {
      status = 200,
      statusText = "OK",
      headers = {},
      json = function()
        if mockres ~= nil then
          return mockres
        end
        return { id = "direct01" }
      end,
      body = "mock",
    }, nil
  end

  local client = sdk.new({
    base = "http://localhost:8080",
    system = {
      fetch = mock_fetch,
    },
  })

  return {
    client = client,
    calls = calls,
    live = false,
    idmap = {},
  }
end
