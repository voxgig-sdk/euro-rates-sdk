import { EuroRatesEntityBase } from '../EuroRatesEntityBase';
import type { EuroRatesSDK } from '../EuroRatesSDK';
import type { Control } from '../types';
import type { Currency, CurrencyListMatch } from '../EuroRatesTypes';
declare class CurrencyEntity extends EuroRatesEntityBase<Currency> {
    constructor(client: EuroRatesSDK, entopts: any);
    make(this: CurrencyEntity): CurrencyEntity;
    list(this: any, reqmatch?: CurrencyListMatch, ctrl?: Control): Promise<CurrencyEntity[]>;
}
export { CurrencyEntity };
