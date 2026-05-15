<?php
declare(strict_types=1);

// EuroRates SDK utility: result_body

class EuroRatesResultBody
{
    public static function call(EuroRatesContext $ctx): ?EuroRatesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
