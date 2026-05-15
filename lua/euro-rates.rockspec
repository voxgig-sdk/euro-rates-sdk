package = "voxgig-sdk-euro-rates"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/euro-rates-sdk.git"
}
description = {
  summary = "EuroRates SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["euro-rates_sdk"] = "euro-rates_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
