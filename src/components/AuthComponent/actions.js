"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpointConnection_1 = require("../../Services/Redux/endpointConnection");
function Auth(user, pass) {
    return {
        type: "AUTHENTICATE",
        payload: endpointConnection_1.authenticate(user, pass)
    };
}
exports.Auth = Auth;
function logout() {
    return {
        type: "LOGOUT"
    };
}
exports.logout = logout;
