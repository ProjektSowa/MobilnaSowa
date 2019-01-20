"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
function initSessionState() {
    return {
        isLogged: false
    };
}
exports.initSessionState = initSessionState;
function initLanguageState() {
    if (react_native_1.Platform.OS == "android") {
        return { lang: react_native_1.NativeModules.I18nManager.localeIdentifier };
    }
    else if (react_native_1.Platform.OS == "ios") {
        return { lang: react_native_1.NativeModules.SettingsManager.settings.AppleLocale };
    }
}
exports.initLanguageState = initLanguageState;
exports.session = (state, action) => {
    if (!state) {
        return initSessionState();
    }
    switch (action.type) {
        case "AUTHENTICATE_FULFILLED": {
            alert("FULFILLED");
            return Object.assign({}, state, { isLogged: true, authData: Object.assign({}, action.payload) });
        }
        case "AUTHENTICATE_REJECTED": {
            alert("REJECTED");
            return state;
        }
        default:
            return state;
    }
};
exports.lang = (state, action) => {
    if (!state) {
        return initLanguageState();
    }
    switch (action.type) {
        default:
            return state;
    }
};
