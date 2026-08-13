# EuroRates SDK feature factory

from eurorates_sdk.feature.base_feature import EuroRatesBaseFeature
from eurorates_sdk.feature.test_feature import EuroRatesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: EuroRatesBaseFeature(),
        "test": lambda: EuroRatesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
