"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SowaRequest_1 = require("./SowaRequest");
class DeadlineBookFinder {
    constructor() {
    }
    linkAccounts() {
        let command = [];
        command.push("AccountLink");
        let parameters = [];
        parameters.push("12345678");
        parameters.push("Test.Sowa.1");
        parameters.push("testsowa@pswbp.pl");
        command.push(parameters);
        let request = new SowaRequest_1.SowaRequest();
        request.exec.push(command);
    }
}
exports.default = DeadlineBookFinder;
