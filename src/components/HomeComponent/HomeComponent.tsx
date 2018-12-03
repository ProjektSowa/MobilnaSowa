import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {NavigationScreenProp, withNavigation} from "react-navigation";

interface NavigateProps {
    navigation: NavigationScreenProp<any, any>
}

class HomeComponent extends Component<NavigateProps, any>{
    constructor(props : any) {
        super(props)
        alert("Hej")
    }

    render() {
        return (
            <View>
                <Button title={"AuthComponent"} onPress={ev => {return this.props.navigation.navigate('Auth')}}/>
                <Button title={"SearchComponent"} onPress={ev => {return this.props.navigation.navigate('SearchComponent')}}/>
            </View>
        );
    }
}

export default withNavigation(HomeComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    }
});
