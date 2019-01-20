"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const endpointConnection_1 = require("../Services/Redux/endpointConnection");
const react_native_elements_1 = require("react-native-elements");
class BookedBooksComponent extends react_1.Component {
    constructor(props) {
        super(props);
        this.onButtonPressed = () => __awaiter(this, void 0, void 0, function* () {
            yield this.accountStatus();
            //alert(this.myResponse);
        });
        this.accountStatus = () => __awaiter(this, void 0, void 0, function* () {
            let response = yield endpointConnection_1.sendRequest([
                [
                    "AccountStatus",
                    [
                        "O14074",
                        "2b666d5a7730386c492c4f34255a2665663b2b31" //key
                    ]
                ]
            ]);
            console.log('otrzymałem odpowiedzs: ' + response);
            //alert(response.toString());
            var data;
            data = JSON.stringify(response);
            // this.setState({
            //      validTo: response.validTo
            //  })
            //data2 = response;
            //data2.getChildContext();
            alert(data);
            //alert(data2.getChildContext("loaned"));
            // this.convertResponse(data);
        });
        this.state = {
            validTo: ""
        };
    }
    render() {
        return react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(react_native_elements_1.Button, { onPress: () => {
                    this.onButtonPressed();
                }, title: 'Wy\u015Bwietl' }));
    }
}
exports.default = BookedBooksComponent;
const styles = react_native_1.StyleSheet.create({});
