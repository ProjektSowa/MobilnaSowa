"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
class AuthComponent extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, null, "Zaloguj si\u0119"),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.input, placeholder: 'Adres Email' }),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.input, placeholder: 'Has\u0142o' }),
            react_1.default.createElement(react_native_1.Button, { title: 'Zaloguj', onPress: () => { alert('click'); } })));
    }
}
exports.default = AuthComponent;
const styles = react_native_1.StyleSheet.create({
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
