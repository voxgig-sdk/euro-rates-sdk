<?php
declare(strict_types=1);

// EuroRates SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

EuroRatesUtility::setRegistrar(function (EuroRatesUtility $u): void {
    $u->clean = [EuroRatesClean::class, 'call'];
    $u->done = [EuroRatesDone::class, 'call'];
    $u->make_error = [EuroRatesMakeError::class, 'call'];
    $u->feature_add = [EuroRatesFeatureAdd::class, 'call'];
    $u->feature_hook = [EuroRatesFeatureHook::class, 'call'];
    $u->feature_init = [EuroRatesFeatureInit::class, 'call'];
    $u->fetcher = [EuroRatesFetcher::class, 'call'];
    $u->make_fetch_def = [EuroRatesMakeFetchDef::class, 'call'];
    $u->make_context = [EuroRatesMakeContext::class, 'call'];
    $u->make_options = [EuroRatesMakeOptions::class, 'call'];
    $u->make_request = [EuroRatesMakeRequest::class, 'call'];
    $u->make_response = [EuroRatesMakeResponse::class, 'call'];
    $u->make_result = [EuroRatesMakeResult::class, 'call'];
    $u->make_point = [EuroRatesMakePoint::class, 'call'];
    $u->make_spec = [EuroRatesMakeSpec::class, 'call'];
    $u->make_url = [EuroRatesMakeUrl::class, 'call'];
    $u->param = [EuroRatesParam::class, 'call'];
    $u->prepare_auth = [EuroRatesPrepareAuth::class, 'call'];
    $u->prepare_body = [EuroRatesPrepareBody::class, 'call'];
    $u->prepare_headers = [EuroRatesPrepareHeaders::class, 'call'];
    $u->prepare_method = [EuroRatesPrepareMethod::class, 'call'];
    $u->prepare_params = [EuroRatesPrepareParams::class, 'call'];
    $u->prepare_path = [EuroRatesPreparePath::class, 'call'];
    $u->prepare_query = [EuroRatesPrepareQuery::class, 'call'];
    $u->result_basic = [EuroRatesResultBasic::class, 'call'];
    $u->result_body = [EuroRatesResultBody::class, 'call'];
    $u->result_headers = [EuroRatesResultHeaders::class, 'call'];
    $u->transform_request = [EuroRatesTransformRequest::class, 'call'];
    $u->transform_response = [EuroRatesTransformResponse::class, 'call'];
});
