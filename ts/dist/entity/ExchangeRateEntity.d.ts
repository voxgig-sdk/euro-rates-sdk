import { EuroRatesEntityBase } from '../EuroRatesEntityBase';
import type { EuroRatesSDK } from '../EuroRatesSDK';
import type { Control } from '../types';
import type { ExchangeRate, ExchangeRateLoadMatch } from '../EuroRatesTypes';
declare class ExchangeRateEntity extends EuroRatesEntityBase<ExchangeRate> {
    constructor(client: EuroRatesSDK, entopts: any);
    make(this: ExchangeRateEntity): ExchangeRateEntity;
    load(this: any, reqmatch?: ExchangeRateLoadMatch, ctrl?: Control): Promise<ExchangeRateEntity>;
}
export { ExchangeRateEntity };
