import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { NavigationScreenProp } from 'react-navigation'

interface AuthState {
    json: any
}
interface AuthProps {
    json: any,
    navigation: NavigationScreenProp<any, any>
}
export default class SecondView extends Component<AuthProps, AuthState>{
    constructor(props : AuthProps) {
        super(props)
        this.state = {
            json: this.props.navigation.getParam('json', 'some default value')
        }
    }

    render() {
        return (
            <View>
                <Text>{this.state.json}</Text>
            </View>
        )
    }
}
