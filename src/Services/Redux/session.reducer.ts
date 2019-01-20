import {StoreState} from "./store";
import {languages} from "../Translate/Translate";
import {AsyncStorage, NativeModules, Platform} from "react-native";
import {SessionTypes} from "../../components/AuthComponent/actions";

const initSessionState = () => {
    const authData = "";
	return {
        isLogged : !!authData,
        authData : authData
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
        case SessionTypes.ACCOUNT_LINK + "_FULFILLED" : {
            const authData = action.payload[SessionTypes.ACCOUNT_LINK]
	        return {
                ...state,
                isLogged: true,
                authData: authData[0]
            }
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
