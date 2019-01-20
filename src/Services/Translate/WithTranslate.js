"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const Translate_1 = require("./Translate");
function getDisplayName(WrappedComponent) {
    return (WrappedComponent.displayName || WrappedComponent.name).toLowerCase();
}
function withTranslation() {
    const mapStateToProps = (state, ownProps) => ({
        lang: state.lang.lang
    });
    return (InnerComponent) => {
        class C extends React.Component {
            render() {
                let _a = this.props, { lang } = _a, rest = __rest(_a, ["lang"]);
                let componentName = getDisplayName(InnerComponent);
                return React.createElement(InnerComponent, Object.assign({ lang: Translate_1.languages[lang][componentName] }, rest));
            }
        }
        // @ts-ignore
        return react_redux_1.connect(mapStateToProps)(C);
    };
}
exports.default = withTranslation;
