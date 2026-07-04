# Typed models for the EuroRates SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Currency:
    name: Optional[str] = None
    symbol: Optional[str] = None


@dataclass
class CurrencyListMatch:
    name: Optional[str] = None
    symbol: Optional[str] = None


@dataclass
class ExchangeRate:
    pass


@dataclass
class ExchangeRateLoadMatch:
    pass

