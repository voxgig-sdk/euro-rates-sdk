<?php
declare(strict_types=1);

// EuroRates SDK utility: feature_add

class EuroRatesFeatureAdd
{
    public static function call(EuroRatesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
