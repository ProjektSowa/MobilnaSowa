import * as React from "react";
import {connect} from "react-redux";
import {languages} from "./Translate";


export interface IWithTranslationProps{
    lang : any
}

function getDisplayName(WrappedComponent : any){
    return (WrappedComponent.displayName || WrappedComponent.name).toLowerCase();
}


export default function withTranslation<P>(){
    const mapStateToProps = (state: any, ownProps: any): IWithTranslationProps => ({
        lang: state.lang.lang
    })

    return (InnerComponent: any)=> {
        class C extends React.Component<P & IWithTranslationProps, any> {
            render(){
                let {lang, ...rest} = this.props as any;
                let componentName = getDisplayName(InnerComponent)
                return <InnerComponent lang={languages[lang][componentName]} {...rest}/>
            }
        }
        // @ts-ignore
        return connect(mapStateToProps)(C);
    }
}
