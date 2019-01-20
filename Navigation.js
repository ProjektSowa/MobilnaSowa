"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const AuthComponent_1 = __importDefault(require("./src/components/AuthComponent/AuthComponent"));
const SearchComponent_1 = __importDefault(require("./src/components/SearchComponent"));
const RootStack = react_navigation_1.createStackNavigator({
    Auth: { screen: AuthComponent_1.default },
    Second: { screen: SearchComponent_1.default }
}, {
    initialRouteName: 'Auth'
});
exports.default = RootStack;
