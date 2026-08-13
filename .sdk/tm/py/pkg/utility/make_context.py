# EuroRates SDK utility: make_context

from projectname_sdk.core.context import EuroRatesContext


def make_context_util(ctxmap, basectx):
    return EuroRatesContext(ctxmap, basectx)
