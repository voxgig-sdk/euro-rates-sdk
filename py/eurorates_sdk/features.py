# EuroRates SDK feature factory

from eurorates_sdk.feature.base_feature import EuroRatesBaseFeature
from eurorates_sdk.feature.ratelimit_feature import EuroRatesRatelimitFeature
from eurorates_sdk.feature.retry_feature import EuroRatesRetryFeature
from eurorates_sdk.feature.test_feature import EuroRatesTestFeature
from eurorates_sdk.feature.timeout_feature import EuroRatesTimeoutFeature


_FEATURES = {
    "base": lambda: EuroRatesBaseFeature(),
    "ratelimit": lambda: EuroRatesRatelimitFeature(),
    "retry": lambda: EuroRatesRetryFeature(),
    "test": lambda: EuroRatesTestFeature(),
    "timeout": lambda: EuroRatesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
