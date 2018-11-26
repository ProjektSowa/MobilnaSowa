import {StoreState} from "./store";
import {languages} from "../Translate/Translate";
import {NativeModules, Platform} from "react-native";

export function initSessionState() {
    return {
        isLogged : false
    }
}
export function initLanguageState() {
    if(Platform.OS == "android"){
        return { lang : NativeModules.I18nManager.localeIdentifier }
    } else if(Platform.OS == "ios"){
        return { lang : NativeModules.SettingsManager.settings.AppleLocale }
    }
}

export const session = (state : StoreState.Session, action : any) => {
    if (!state) {
        return initSessionState();
    }

    switch(action.type) {
        case "AUTHENTICATE_FULFILLED" : {
            alert("FULFILLED")
            return {
                ...state,
                isLogged: true,
                authData: {...action.payload}
            }
        }
        case "AUTHENTICATE_REJECTED" : {
            alert("REJECTED")
            return state
        }
        default :
            return state
    }
}

export const lang = (state : StoreState.Language, action : any) => {
    if (!state) {
        return initLanguageState();
    }

    switch (action.type) {
        default :
            return state;
    }
}
