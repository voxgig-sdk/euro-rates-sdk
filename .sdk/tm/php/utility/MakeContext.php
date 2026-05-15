<?php
declare(strict_types=1);

// EuroRates SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class EuroRatesMakeContext
{
    public static function call(array $ctxmap, ?EuroRatesContext $basectx): EuroRatesContext
    {
        return new EuroRatesContext($ctxmap, $basectx);
    }
}
