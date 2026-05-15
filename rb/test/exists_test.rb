# EuroRates SDK exists test

require "minitest/autorun"
require_relative "../EuroRates_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = EuroRatesSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
