"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EuroRatesError = void 0;
class EuroRatesError extends Error {
    isEuroRatesError = true;
    sdk = 'EuroRates';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.EuroRatesError = EuroRatesError;
//# sourceMappingURL=EuroRatesError.js.map