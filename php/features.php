<?php
declare(strict_types=1);

// EuroRates SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class EuroRatesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new EuroRatesBaseFeature();
            case "test":
                return new EuroRatesTestFeature();
            default:
                return new EuroRatesBaseFeature();
        }
    }
}
