<?php
declare(strict_types=1);

// EuroRates SDK base feature

class EuroRatesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(EuroRatesContext $ctx, array $options): void {}
    public function PostConstruct(EuroRatesContext $ctx): void {}
    public function PostConstructEntity(EuroRatesContext $ctx): void {}
    public function SetData(EuroRatesContext $ctx): void {}
    public function GetData(EuroRatesContext $ctx): void {}
    public function GetMatch(EuroRatesContext $ctx): void {}
    public function SetMatch(EuroRatesContext $ctx): void {}
    public function PrePoint(EuroRatesContext $ctx): void {}
    public function PreSpec(EuroRatesContext $ctx): void {}
    public function PreRequest(EuroRatesContext $ctx): void {}
    public function PreResponse(EuroRatesContext $ctx): void {}
    public function PreResult(EuroRatesContext $ctx): void {}
    public function PreDone(EuroRatesContext $ctx): void {}
    public function PreUnexpected(EuroRatesContext $ctx): void {}
}
