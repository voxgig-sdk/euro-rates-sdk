<?php
declare(strict_types=1);

// EuroRates SDK utility: result_headers

class EuroRatesResultHeaders
{
    public static function call(EuroRatesContext $ctx): ?EuroRatesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
