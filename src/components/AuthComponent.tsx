import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface AuthState {
    emailPlaceholder: string
    passwordPlaceholder: string
}
interface AuthProps {

}

export default class AuthComponent extends Component<AuthProps, AuthState>{
    constructor(props : AuthProps) {
        super(props)
        this.state = {
            emailPlaceholder: 'Adres email',
            passwordPlaceholder: 'Hasło'
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>Zaloguj się</Text>
            <TextInput style={styles.input} placeholder='Adres Email'/>
            <TextInput style={styles.input} placeholder='Hasło'/>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        minHeight: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        minWidth: 150,
        paddingLeft: 5,
        paddingVertical: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
});
