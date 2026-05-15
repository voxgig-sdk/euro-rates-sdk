<?php
declare(strict_types=1);

// EuroRates SDK utility: prepare_headers

class EuroRatesPrepareHeaders
{
    public static function call(EuroRatesContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
