"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
// import {withTranslation, IWithTranslationProps} from "../Services/Translate/WithTranslate";
const WithTranslate_1 = __importDefault(require("../../Services/Translate/WithTranslate"));
const actions = __importStar(require("./actions"));
const react_redux_1 = require("react-redux");
let AuthComponent = class AuthComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'testsowa@pswbp.pl',
            password: 'Test.Sowa.1',
            json: {}
        };
    }
    // onButtonPressed = () => {
    //     this.checkIfUserExists()
    // }
    //
    // checkIfUserExists = () => {
    //     fetch('http://testsowa.pswbp.pl/capi.php', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "auth": [
    //                 1,
    //                 "urn:uuid:4dd12e7a-7572-4829-b0fe-e13fef752fda",
    //                 "#iqvbW!JhHch+TW._(+z",
    //                 "42699@lic528.sowa"
    //             ],
    //             "exec": [
    //                 ["AccountCheck", [this.state.username]]
    //             ]
    //         }),
    //     })
    //     .then((response) => {
    //         if(!response.ok)
    //             throw new Error('Network response was not ok.')
    //
    //         return response.json()
    //     })
    //     .then((responseJson) => {
    //         if (responseJson[0].status === 200)
    //             this.loginUser()
    //         else
    //             alert('Zly login lub hasło')
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }
    // loginUser = () => {
    //     fetch('http://testsowa.pswbp.pl/capi.php', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "auth": [
    //                 1,
    //                 "urn:uuid:4dd12e7a-7572-4829-b0fe-e13fef752fda",
    //                 "#iqvbW!JhHch+TW._(+z",
    //                 "42699@lic528.sowa"
    //             ],
    //             "exec": [
    //                 ["AccountAuth", [this.state.username, this.state.password]]
    //             ]
    //         }),
    //     })
    //     .then((response) => {
    //         if(!response.ok)
    //             throw new Error('Network response was not ok.')
    //
    //         return response.json()
    //     })
    //     .then((responseJson) => {
    //         if (responseJson[0].status === 200) {
    //             this.setState({json: responseJson})
    //             console.log(responseJson)
    //             this.props.navigation.navigate('Second', {json: this.state.json[0].data.name})
    //         }
    //         else
    //             alert('Zły login lub hasło')
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }
    render() {
        let { lang, isLogged, authenticate } = this.props;
        if (isLogged) {
            this.props.navigation.navigate('Second');
            return react_1.default.createElement(react_native_1.View, null);
        }
        else {
            return (react_1.default.createElement(react_native_1.ImageBackground, { style: styles.background, source: require('../../assets/images/psw-bg.jpg') },
                react_1.default.createElement(react_native_1.View, { style: styles.container },
                    react_1.default.createElement(react_native_1.View, { style: styles.textContainer },
                        react_1.default.createElement(react_native_1.Text, { style: [styles.textStyle, styles.textCenter, styles.textBold] }, lang.zaloguj)),
                    react_1.default.createElement(react_native_1.View, { style: styles.inputContainer },
                        react_1.default.createElement(react_native_1.TextInput, { onChangeText: (username) => this.setState({ username }), value: this.state.username, style: styles.input, placeholder: lang.email }),
                        react_1.default.createElement(react_native_1.TextInput, { secureTextEntry: true, onChangeText: (password) => this.setState({ password }), value: this.state.password, style: styles.input, placeholder: lang.haslo }),
                        react_1.default.createElement(react_native_1.View, { style: styles.buttonStyle },
                            react_1.default.createElement(react_native_1.Button, { color: '#fff', title: lang.login, onPress: () => { authenticate(this.state.username, this.state.password); } }))))));
        }
    }
};
AuthComponent = __decorate([
    WithTranslate_1.default()
], AuthComponent);
exports.AuthComponent = AuthComponent;
function mapStateToProps({ session }, ownProps) {
    return {
        isLogged: session.isLogged
    };
}
function mapDispatchToProps(dispatch) {
    return {
        authenticate: (p, s) => dispatch(actions.Auth(p, s))
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
const styles = react_native_1.StyleSheet.create({
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
