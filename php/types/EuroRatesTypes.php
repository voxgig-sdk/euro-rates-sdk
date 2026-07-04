<?php
declare(strict_types=1);

// Typed models for the EuroRates SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Currency entity data model. */
class Currency
{
    public ?string $name = null;
    public ?string $symbol = null;
}

/** Match filter for Currency#list (any subset of Currency fields). */
class CurrencyListMatch
{
    public ?string $name = null;
    public ?string $symbol = null;
}

/** ExchangeRate entity data model. */
class ExchangeRate
{
}

/** Match filter for ExchangeRate#load (any subset of ExchangeRate fields). */
class ExchangeRateLoadMatch
{
}

