# Currency direct test

import json
import pytest

from utility.voxgig_struct import voxgig_struct as vs
from eurorates_sdk import EuroRatesSDK
from core import helpers
from test import runner


class TestCurrencyDirect:

    def test_should_direct_list_currency(self):
        setup = _currency_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-currency", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]


        result, err = client.direct({
            "path": "api/all-currencies",
            "method": "GET",
            "params": {},
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if err is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {err}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert err is None
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _currency_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "EURORATES_TEST_CURRENCY_ENTID": {},
        "EURORATES_TEST_LIVE": "FALSE",
        "EURORATES_APIKEY": "NONE",
    })

    live = env.get("EURORATES_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
            "apikey": env.get("EURORATES_APIKEY"),
        }
        client = EuroRatesSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = EuroRatesSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
