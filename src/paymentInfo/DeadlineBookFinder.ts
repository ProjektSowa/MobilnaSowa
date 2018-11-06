import {SowaRequest} from "./SowaRequest";


export default class DeadlineBookFinder {

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

        let request = new SowaRequest();
        request.exec.push(command);


    }
}