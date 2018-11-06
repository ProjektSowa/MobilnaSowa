import {StoreState} from "./store";
import {languages} from "../Translate/Translate";
import {NativeModules, Platform} from "react-native";

export function initState() {
    return {
        isLogged : true
    }
}
export function initStateLang() {
    let locale = "";
    if(Platform.OS == "android"){
        return { lang : NativeModules.I18nManager.localeIdentifier }
    } else if(Platform.OS == "ios"){
        return { lang : NativeModules.SettingsManager.settings.AppleLocale }
    }
}

export const session = (state? : StoreState.Session, action? : any) => {
    if (!state) {
        return initState();
    }

    switch(action.type) {
        case "AUTHENTICATE_FULFILLED" : {
            return {
                ...state,
                isLogged: true
            }
        }
        default :
            return state
    }
}

export const lang = (state : StoreState.Language, action : any) => {
    if (!state) {
        return initStateLang();
    }

    switch (action.type) {
        default :
            return state;
    }
}
