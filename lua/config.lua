-- EuroRates SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "EuroRates",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.exchangerate.host",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["currency"] = {},
        ["exchange_rate"] = {},
      },
    },
    entity = {
      ["currency"] = {
        ["fields"] = {
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "symbol",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "currency",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/all-currencies",
                ["parts"] = {
                  "api",
                  "all-currencies",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["exchange_rate"] = {
        ["fields"] = {},
        ["name"] = "exchange_rate",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "EUR",
                      ["kind"] = "query",
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "HKD,GBP,USD",
                      ["kind"] = "query",
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/rates",
                ["parts"] = {
                  "api",
                  "rates",
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "to",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
