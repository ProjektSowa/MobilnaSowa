import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import RootStack from './Navigation'
import {store} from "./src/Services/Redux/store";
import {Provider} from "react-redux";
export class App extends Component{
    constructor(props : any) {
        super(props)
    }
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <RootStack/>
                </View>
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
