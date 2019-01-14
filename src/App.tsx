import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import RootStack from './Navigation'
import {store} from "./Services/Redux/store";
import {Provider} from "react-redux";
import {NavigationScreenProp, NavigationScreenProps} from "react-navigation";

interface NavigateProps {
    navigation: NavigationScreenProp<any, any>
}

export class App extends Component<NavigateProps, any>{

    constructor(props : any) {
        super(props)
    }
    render() {
        console.log("hello")
        return (
            <Provider store={store}>
                <RootStack/>
            </Provider>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    }
});
