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
const react_redux_1 = require("react-redux");
class SecondView extends react_1.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     json: this.props.navigation.getParam('json', 'some default value')
        // }
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(react_native_1.Text, null, this.props.key)));
    }
}
exports.SecondView = SecondView;
function mapStateToProps({ session }, ownProps) {
    return {
        key: session.authData.key
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(SecondView);
