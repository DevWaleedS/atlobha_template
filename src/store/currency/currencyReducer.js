import { CURRENCY_CHANGE } from './currencyActionTypes';

const initialState = {
    code: 'SAR',
    symbol: 'ر.س',
    name: 'الريال السعودي',
};

export default function currencyReducer(state = initialState, action) {
    if (action.type === CURRENCY_CHANGE && state.code !== action.currency.code) {
        return JSON.parse(JSON.stringify(action.currency));
    }

    return state;
}
