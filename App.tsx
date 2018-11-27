import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import RootStack from './Navigation'
import {store} from "./src/Services/Redux/store";
import {Provider} from "react-redux";
import SearchComponent from "./src/components/SearchComponent";
import {NavigationScreenProp} from "react-navigation";
import HomeComponent from "./src/components/HomeComponent/HomeComponent";

interface NavigateProps {
    navigation: NavigationScreenProp<any, any>
}

class App extends Component<NavigateProps, any>{
    constructor(props : any) {
        super(props)
        console.log(props);
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

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    }
});
