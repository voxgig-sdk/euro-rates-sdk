# EuroRates SDK configuration

module EuroRatesConfig
  def self.make_config
    {
      "main" => {
        "name" => "EuroRates",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.exchangerate.host",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "currency" => {},
          "exchange_rate" => {},
        },
      },
      "entity" => {
        "currency" => {
          "fields" => [
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "symbol",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "currency",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/api/all-currencies",
                  "parts" => [
                    "api",
                    "all-currencies",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "exchange_rate" => {
          "fields" => [],
          "name" => "exchange_rate",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "EUR",
                        "kind" => "query",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "HKD,GBP,USD",
                        "kind" => "query",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/api/rates",
                  "parts" => [
                    "api",
                    "rates",
                  ],
                  "select" => {
                    "exist" => [
                      "from",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    EuroRatesFeatures.make_feature(name)
  end
end
