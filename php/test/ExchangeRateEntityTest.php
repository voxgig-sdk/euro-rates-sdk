<?php
declare(strict_types=1);

// ExchangeRate entity test

require_once __DIR__ . '/../eurorates_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ExchangeRateEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EuroRatesSDK::test(null, null);
        $ent = $testsdk->ExchangeRate(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = exchange_rate_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "exchange_rate." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set EURORATES_TEST_EXCHANGE_RATE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $exchange_rate_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.exchange_rate")));
        $exchange_rate_ref01_data = null;
        if (count($exchange_rate_ref01_data_raw) > 0) {
            $exchange_rate_ref01_data = Helpers::to_map($exchange_rate_ref01_data_raw[0][1]);
        }

        // LOAD
        $exchange_rate_ref01_ent = $client->ExchangeRate(null);
        $exchange_rate_ref01_match_dt0 = [];
        $exchange_rate_ref01_data_dt0_loaded = $exchange_rate_ref01_ent->load($exchange_rate_ref01_match_dt0, null);
        $this->assertNotNull($exchange_rate_ref01_data_dt0_loaded);

    }
}

function exchange_rate_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/exchange_rate/ExchangeRateTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EuroRatesSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["exchange_rate01", "exchange_rate02", "exchange_rate03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("EURORATES_TEST_EXCHANGE_RATE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "EURORATES_TEST_EXCHANGE_RATE_ENTID" => $idmap,
        "EURORATES_TEST_LIVE" => "FALSE",
        "EURORATES_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["EURORATES_TEST_EXCHANGE_RATE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["EURORATES_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new EuroRatesSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["EURORATES_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["EURORATES_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
