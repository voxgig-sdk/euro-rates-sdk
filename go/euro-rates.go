package voxgigeuroratessdk

import (
	"github.com/voxgig-sdk/euro-rates-sdk/go/core"
	"github.com/voxgig-sdk/euro-rates-sdk/go/entity"
	"github.com/voxgig-sdk/euro-rates-sdk/go/feature"
	_ "github.com/voxgig-sdk/euro-rates-sdk/go/utility"
)

// Type aliases preserve external API.
type EuroRatesSDK = core.EuroRatesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type EuroRatesEntity = core.EuroRatesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type EuroRatesError = core.EuroRatesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCurrencyEntityFunc = func(client *core.EuroRatesSDK, entopts map[string]any) core.EuroRatesEntity {
		return entity.NewCurrencyEntity(client, entopts)
	}
	core.NewExchangeRateEntityFunc = func(client *core.EuroRatesSDK, entopts map[string]any) core.EuroRatesEntity {
		return entity.NewExchangeRateEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewEuroRatesSDK = core.NewEuroRatesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
