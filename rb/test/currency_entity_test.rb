# Currency entity test

require "minitest/autorun"
require "json"
require_relative "../EuroRates_sdk"
require_relative "runner"

class CurrencyEntityTest < Minitest::Test
  def test_create_instance
    testsdk = EuroRatesSDK.test(nil, nil)
    ent = testsdk.Currency(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = currency_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "currency." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EURORATES_TEST_CURRENCY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    currency_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.currency")))
    currency_ref01_data = nil
    if currency_ref01_data_raw.length > 0
      currency_ref01_data = Helpers.to_map(currency_ref01_data_raw[0][1])
    end

    # LIST
    currency_ref01_ent = client.Currency(nil)
    currency_ref01_match = {}

    currency_ref01_list_result = currency_ref01_ent.list(currency_ref01_match, nil)
    assert currency_ref01_list_result.is_a?(Array)

  end
end

def currency_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "currency", "CurrencyTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EuroRatesSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["currency01", "currency02", "currency03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["EURORATES_TEST_CURRENCY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EURORATES_TEST_CURRENCY_ENTID" => idmap,
    "EURORATES_TEST_LIVE" => "FALSE",
    "EURORATES_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["EURORATES_TEST_CURRENCY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["EURORATES_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = EuroRatesSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["EURORATES_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["EURORATES_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
