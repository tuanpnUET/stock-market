const AUTHENTICATE_ROUTE = {
    FIRST_SCREEN: '@AUTHENTICATE_ROUTE/FIRST_SCREEN',
    LOGIN: '@AUTHENTICATE_ROUTE/LOGIN',
    REGISTER: '@AUTHENTICATE_ROUTE/REGISTER',
    FORGOT_PASS: '@AUTHENTICATE_ROUTE/FORGOT_PASS',
    SEND_OTP: '@AUTHENTICATE_ROUTE/SEND_OTP',
    CHANGE_PASS: '@AUTHENTICATE_ROUTE/CHANGE_PASS',
};

const APP_ROUTE = {
    MAIN_TAB: 'MAIN_TAB',
};

const HOME_ROUTE = {
    ROOT: 'HOME_ROOT',
    HOME: 'HOME',
};

const SETTING_ROUTE = {
    ROOT: 'SETTING_ROOT',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
};

const NOTIFICATION_ROUTE = {
    ROOT: 'NOTIFICATION_ROOT',
};

const ACCOUNT_ROUTE = {
    ROOT: 'ACCOUNT_ROUTE',
};

const NEWS_ROUTE = {
    ROOT: 'NEWS_ROUTE',
    NEWS_DETAIL: 'NEW_DETAIL',
    ADD_NEWS: 'ADD_NEWS',
};

const MARKET_ROUTE = {
    ROOT: 'MARKET_ROUTE',
};

const TAB_NAVIGATION_ROOT = {
    HOME_ROUTE,
    SETTING_ROUTE,
    NOTIFICATION_ROUTE,
    ACCOUNT_ROUTE,
    NEWS_ROUTE,
    MARKET_ROUTE,
};

export { APP_ROUTE, TAB_NAVIGATION_ROOT, AUTHENTICATE_ROUTE };
