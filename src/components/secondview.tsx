import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { NavigationScreenProp } from 'react-navigation'
import {connect} from "react-redux";

interface AuthState {
    json: any
}
interface AuthProps {
    key: any,
    // navigation: NavigationScreenProp<any, any>
}
export class SecondView extends Component<AuthProps, AuthState>{
    constructor(props : AuthProps) {
        super(props)
        // this.state = {
        //     json: this.props.navigation.getParam('json', 'some default value')
        // }
    }

    render() {
        return (
            <View>
                <Text>{this.props.key}</Text>
            </View>
        )
    }
}

function mapStateToProps({session} : any, ownProps:any){
    return {
        key : session.authData.key
    }
}

export default connect(mapStateToProps)(SecondView)