# EuroRates SDK configuration


def make_config():
    return {
        "main": {
            "name": "EuroRates",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.exchangerate.host",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "currency": {},
                "exchange_rate": {},
            },
        },
        "entity": {
      "currency": {
        "fields": [
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "symbol",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "currency",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/all-currencies",
                "parts": [
                  "api",
                  "all-currencies",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "exchange_rate": {
        "fields": [],
        "name": "exchange_rate",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "EUR",
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "HKD,GBP,USD",
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/rates",
                "parts": [
                  "api",
                  "rates",
                ],
                "select": {
                  "exist": [
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
