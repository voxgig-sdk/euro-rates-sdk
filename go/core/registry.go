package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCurrencyEntityFunc func(client *EuroRatesSDK, entopts map[string]any) EuroRatesEntity

var NewExchangeRateEntityFunc func(client *EuroRatesSDK, entopts map[string]any) EuroRatesEntity

