import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import RootStack from './Navigation'
import {store} from "./src/Services/Redux/store";
import {Provider} from "react-redux";
import BookedBooksComponent from "./src/components/BookedBooksComponent";
export class App extends Component{
    constructor(props : any) {
        super(props)
    }

    render() {
        return (
            <View>
                <BookedBooksComponent/>
            </View>
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
