import { languages } from "./languages";

export const FALLBACK_LOCALE = 'en';

export const getString = (locale, code) => {
    const tokens = code.split(".");
    return tokens.reduce((acc, curr) => {
       return acc && acc[curr];
    }, languages[locale].translations);
}