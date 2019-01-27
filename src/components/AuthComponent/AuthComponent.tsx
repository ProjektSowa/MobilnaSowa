import React, {Component} from 'react';
import {StyleSheet, Text, ImageBackground, TextInput, View} from 'react-native';
import { NavigationScreenProp } from 'react-navigation'
import withTranslation, {IWithTranslationProps} from '../../Services/Translate/WithTranslate'
import {Dispatch} from "redux";
import * as actions from "./actions";
import {connect} from "react-redux";
import {Button} from "native-base";



interface AuthState {
    username: string,
    password: string,
}

interface AuthProps extends IWithTranslationProps{
    navigation: NavigationScreenProp<any, any>,
    authenticate: (p: string, s: string) => void,
    authenticate2: (p: string, s: string) => void,
    isLogged : boolean
}

@withTranslation()
export class AuthComponent extends React.Component<AuthProps, AuthState>{
    constructor(props : AuthProps) {
        super(props)

        this.state = {
            username: 'testsowa@pswbp.pl',
            password: 'Test.Sowa.1',
        }
    }



    render() {
        let { lang, isLogged, authenticate,authenticate2  } = this.props
	    console.log(isLogged);
        if(isLogged){

	        this.props.navigation.navigate('App')
            return <View/>
        } else {
            return (
                <ImageBackground style={styles.background} source={require('../../../assets/images/psw-bg.jpg')}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={[styles.textStyle, styles.textCenter, styles.textBold]}>{lang.header}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput onChangeText={(username) => this.setState({username})}  value={this.state.username} style={styles.input} placeholder={lang.email}/>
                            <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password} style={styles.input} placeholder={lang.password}/>
                            <Button block onPress={() => { authenticate(this.state.username, this.state.password),authenticate2(this.state.username, this.state.password) }}>
                                <Text> { lang.submit } </Text>
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
            )
        }

    }
}

function mapStateToProps({session} : any, ownProps: any){
    return {
        isLogged : session.isLogged
    }
}

function mapDispatchToProps(dispatch : Dispatch<actions.SessionAction>){
    return {
        authenticate: (p: string, s: string) => dispatch(actions.Auth(p, s)),
        authenticate2: (p: string, s: string) => dispatch(actions.Auth2(p, s))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthComponent)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '80%',
        maxHeight: 230,
        borderWidth: 1,
        borderColor: '#36a0ec',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    inputContainer: {
        width: '100%',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5
    },
    input: {
        minHeight: 20,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        width: '100%',
        paddingLeft: 5,
        paddingVertical: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#36a0ec'

    },
    textStyle: {
        color: '#36a0ec',
        fontSize: 18
    },
    textBold: {
        fontWeight: 'bold'
    },
    textCenter: {
        textAlign: 'center'
    },
    buttonStyle: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#36a0ec'
    }
});
