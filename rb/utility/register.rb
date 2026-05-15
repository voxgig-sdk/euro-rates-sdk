# EuroRates SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

EuroRatesUtility.registrar = ->(u) {
  u.clean = EuroRatesUtilities::Clean
  u.done = EuroRatesUtilities::Done
  u.make_error = EuroRatesUtilities::MakeError
  u.feature_add = EuroRatesUtilities::FeatureAdd
  u.feature_hook = EuroRatesUtilities::FeatureHook
  u.feature_init = EuroRatesUtilities::FeatureInit
  u.fetcher = EuroRatesUtilities::Fetcher
  u.make_fetch_def = EuroRatesUtilities::MakeFetchDef
  u.make_context = EuroRatesUtilities::MakeContext
  u.make_options = EuroRatesUtilities::MakeOptions
  u.make_request = EuroRatesUtilities::MakeRequest
  u.make_response = EuroRatesUtilities::MakeResponse
  u.make_result = EuroRatesUtilities::MakeResult
  u.make_point = EuroRatesUtilities::MakePoint
  u.make_spec = EuroRatesUtilities::MakeSpec
  u.make_url = EuroRatesUtilities::MakeUrl
  u.param = EuroRatesUtilities::Param
  u.prepare_auth = EuroRatesUtilities::PrepareAuth
  u.prepare_body = EuroRatesUtilities::PrepareBody
  u.prepare_headers = EuroRatesUtilities::PrepareHeaders
  u.prepare_method = EuroRatesUtilities::PrepareMethod
  u.prepare_params = EuroRatesUtilities::PrepareParams
  u.prepare_path = EuroRatesUtilities::PreparePath
  u.prepare_query = EuroRatesUtilities::PrepareQuery
  u.result_basic = EuroRatesUtilities::ResultBasic
  u.result_body = EuroRatesUtilities::ResultBody
  u.result_headers = EuroRatesUtilities::ResultHeaders
  u.transform_request = EuroRatesUtilities::TransformRequest
  u.transform_response = EuroRatesUtilities::TransformResponse
}
