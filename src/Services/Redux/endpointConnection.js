"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let api_path = "http://testsowa.pswbp.pl/capi.php";
function sendRequest(requestData) {
    return execute(axios_1.default.post(api_path, extendRequestWithAuth(requestData)), requestData.map(request => request[0]));
}
exports.sendRequest = sendRequest;
function authenticate(login, password) {
    return execute(axios_1.default.post(api_path, extendRequestWithAuth(["AccountLink", [login, password, login, login]])), ["AccountLink"]);
}
exports.authenticate = authenticate;
function execute(requestPromise, requestName) {
    return requestPromise
        .then((response) => {
        let temp = {};
        response.data.forEach((value, index) => {
            if (temp[requestName[index]]) {
                temp[requestName[index]] = [
                    ...temp[requestName[index]],
                    value.data
                ];
            }
            else {
                temp[requestName[index]] = [value.data];
            }
        });
        return Promise.resolve(temp);
    })
        .catch((error) => {
        console.log('error: ' + error);
        // if(response.status == 403) {
        //     alert("Bark Autentykacji")
        //     // store.dispatch(()=> {})
        // }
    });
}
function extendRequestWithAuth(requestData) {
    let request = {
        auth: [1, "urn:uuid:4dd12e7a-7572-4829-b0fe-e13fef752fda", "#iqvbW!JhHch+TW._(+z", "42699@lic528.sowa"],
        exec: [...requestData]
    };
    console.log("request", request);
    return request;
}
