<?php
declare(strict_types=1);

// EuroRates SDK utility: prepare_body

class EuroRatesPrepareBody
{
    public static function call(EuroRatesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
