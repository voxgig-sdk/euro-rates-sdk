# EuroRates SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module EuroRatesFeatures
  def self.make_feature(name)
    case name
    when "base"
      EuroRatesBaseFeature.new
    when "test"
      EuroRatesTestFeature.new
    else
      EuroRatesBaseFeature.new
    end
  end
end
