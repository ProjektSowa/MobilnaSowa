import * as React from "react";
import { NativeModules, Platform } from 'react-native'
import {languages} from "./Translate";

export interface IWithTranslationProps{
    lang? : any
}

function getDisplayName(WrappedComponent : any){
    return (WrappedComponent.displayName || WrappedComponent.name).toLowerCase();
}


export function withTranslation<P>(){

    return (InnerComponent: any)=> {
        class C extends React.Component<P & IWithTranslationProps, any> {
            render(){
                let locale = "";
                if(Platform.OS == "android"){
                    locale = NativeModules.I18nManager.localeIdentifier
                } else if(Platform.OS == "ios"){
                    locale = NativeModules.SettingsManager.settings.AppleLocale
                }

                let {...rest} = this.props as any;
                let componentName = getDisplayName(InnerComponent)
                return <InnerComponent lang={languages[locale][componentName]} {...rest}/>
            }
        }
        // @ts-ignore
        return C
    }
}