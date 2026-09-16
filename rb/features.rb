# EuroRates SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module EuroRatesFeatures
  def self.make_feature(name)
    case name
    when "base"
      EuroRatesBaseFeature.new
    when "ratelimit"
      EuroRatesRatelimitFeature.new
    when "retry"
      EuroRatesRetryFeature.new
    when "test"
      EuroRatesTestFeature.new
    when "timeout"
      EuroRatesTimeoutFeature.new
    else
      EuroRatesBaseFeature.new
    end
  end
end
