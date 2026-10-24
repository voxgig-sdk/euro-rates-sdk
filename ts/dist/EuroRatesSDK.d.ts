import { CurrencyEntity } from './entity/CurrencyEntity';
import { ExchangeRateEntity } from './entity/ExchangeRateEntity';
export type * from './EuroRatesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { EuroRatesEntityBase } from './EuroRatesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class EuroRatesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Currency(entopts?: Record<string, any>): CurrencyEntity;
    ExchangeRate(entopts?: Record<string, any>): ExchangeRateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): EuroRatesSDK;
    tester(testopts?: any, sdkopts?: any): EuroRatesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof EuroRatesSDK;
export { stdutil, config, BaseFeature, EuroRatesEntityBase, EuroRatesSDK, SDK, };
export type { DirectResult };
