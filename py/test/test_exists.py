# ProjectName SDK exists test

import pytest
from eurorates_sdk import EuroRatesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = EuroRatesSDK.test(None, None)
        assert testsdk is not None
