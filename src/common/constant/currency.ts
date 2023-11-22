export enum CurrencyType {
    USD = "USD",
    THB = "THB",
    VND = "VND",
    CAD = "CAD",
    EUR = "EUR",
}

export interface ICurrency {
    code?: CurrencyType;
    name?: string;
    symbol?: any;
}

export const DEFAULT_CURRENCY = CurrencyType.USD;

export const CURRENCY_LIST = [
    CurrencyType.USD,
    CurrencyType.THB,
    CurrencyType.VND,
    CurrencyType.CAD,
    CurrencyType.EUR,
];
