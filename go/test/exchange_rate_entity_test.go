package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/euro-rates-sdk/go"
	"github.com/voxgig-sdk/euro-rates-sdk/go/core"

	vs "github.com/voxgig-sdk/euro-rates-sdk/go/utility/struct"
)

func TestExchangeRateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ExchangeRate(nil)
		if ent == nil {
			t.Fatal("expected non-nil ExchangeRateEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := exchange_rateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "exchange_rate." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set EURORATES_TEST_EXCHANGE_RATE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		exchangeRateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.exchange_rate", setup.data)))
		var exchangeRateRef01Data map[string]any
		if len(exchangeRateRef01DataRaw) > 0 {
			exchangeRateRef01Data = core.ToMapAny(exchangeRateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = exchangeRateRef01Data

		// LOAD
		exchangeRateRef01Ent := client.ExchangeRate(nil)
		exchangeRateRef01MatchDt0 := map[string]any{}
		exchangeRateRef01DataDt0Loaded, err := exchangeRateRef01Ent.Load(exchangeRateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if exchangeRateRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func exchange_rateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "exchange_rate", "ExchangeRateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read exchange_rate test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse exchange_rate test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"exchange_rate01", "exchange_rate02", "exchange_rate03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("EURORATES_TEST_EXCHANGE_RATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EURORATES_TEST_EXCHANGE_RATE_ENTID": idmap,
		"EURORATES_TEST_LIVE":      "FALSE",
		"EURORATES_TEST_EXPLAIN":   "FALSE",
		"EURORATES_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EURORATES_TEST_EXCHANGE_RATE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["EURORATES_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["EURORATES_APIKEY"],
			},
			extra,
		})
		client = sdk.NewEuroRatesSDK(core.ToMapAny(mergedOpts))
	}

	live := env["EURORATES_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["EURORATES_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
