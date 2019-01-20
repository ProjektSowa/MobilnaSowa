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
const Book_1 = require("./Book");
class SearchComponent extends react_1.Component {
    constructor(props) {
        super(props);
        this.permalink = "";
        this.searchingPhrase = "";
        this.isDisSearchingButton = false;
        this.books = new Array();
        this.onButtonPressed = () => __awaiter(this, void 0, void 0, function* () {
            this.setState({ isDisSearchingButton: true });
            console.log(this.searchingPhrase);
            if (this.searchingPhrase === "") {
                alert("Złe dane wejściowe");
            }
            else {
                let keyWords = this.searchingPhrase.split(/\s+/);
                console.log('keyWords');
                console.log(keyWords);
                yield this.getWordPermaLink(keyWords);
                yield this.retreivePage();
            }
            // this.setState({isDisSearchingButton: false})
        });
        this.getWordPermaLink = (keyWords) => __awaiter(this, void 0, void 0, function* () {
            let response = yield endpointConnection_1.sendRequest([
                ["GetWordsPermalink", [keyWords]]
            ]);
            console.log('otrzymałem odpowiedz: ' + response);
            console.log(response);
            this.permalink = response.GetWordsPermalink[0];
        });
        this.retreivePage = (pageNr = 1) => __awaiter(this, void 0, void 0, function* () {
            let exec = [
                [
                    "RetrievePage", [this.permalink, pageNr, "json", "loans"]
                ],
                [
                    "RetrievePage", [this.permalink, pageNr, "json", "marc21"]
                ]
            ];
            let response = yield endpointConnection_1.sendRequest(exec);
            console.log(response);
            this.convertResponse(response);
        });
        this.state = { records: [], isDisSearchingButton: true };
    }
    convertResponse(response) {
        let arrayOfBooks = new Array();
        let book;
        for (let k = 0; k < response.RetrievePage[0].records.length; k++) {
            //loans
            let loans = response.RetrievePage[0].records[k].view;
            let arrayBorrow = new Array();
            for (let i = 0; i < loans.length; i++) {
                let borrowBook = new Book_1.BorrowBook(loans[i][0], loans[i][1], loans[i][2], loans[i][3], loans[i][4], loans[i][5], loans[i][6], loans[i][7]);
                arrayBorrow.push(borrowBook);
            }
            //marc21
            let marc21 = response.RetrievePage[1].records[k].view.data;
            let author = "";
            let title = "";
            let publisher = "";
            let publishDate = "";
            let ISBN = "";
            let description = "";
            for (let j = 0; j < marc21.length; j++) {
                switch (marc21[j][0]) {
                    case "100":
                        for (let l = 0; l < marc21[j][3].length; l++) {
                            switch (marc21[j][3][l][0]) {
                                case "a":
                                    author = marc21[j][3][l][1];
                                    break;
                            }
                        }
                        break;
                    case "245":
                        for (let l = 0; l < marc21[j][3].length; l++) {
                            switch (marc21[j][3][l][0]) {
                                case "a":
                                    title += marc21[j][3][l][1];
                                    break;
                                case "c":
                                    title += marc21[j][3][l][1];
                                    break;
                            }
                        }
                        break;
                    case "260":
                        for (let l = 0; l < marc21[j][3].length; l++) {
                            switch (marc21[j][3][l][0]) {
                                case "a":
                                    publisher += marc21[j][3][l][1];
                                    break;
                                case "b":
                                    publisher += marc21[j][3][l][1];
                                    break;
                                case "c":
                                    publisher += marc21[j][3][l][1];
                                    break;
                            }
                        }
                        break;
                    case "920":
                        for (let l = 0; l < marc21[j][3].length; l++) {
                            switch (marc21[j][3][l][0]) {
                                case "a":
                                    ISBN = marc21[j][3][l][1];
                                    break;
                            }
                        }
                        break;
                    case "940":
                        for (let l = 0; l < marc21[j][3].length; l++) {
                            switch (marc21[j][3][l][0]) {
                                case "a":
                                    description = marc21[j][3][l][1];
                                    break;
                            }
                        }
                        break;
                }
            }
            book = new Book_1.Book(author, title, publisher, ISBN, description, arrayBorrow);
            arrayOfBooks.push(book);
        }
        console.log(arrayOfBooks);
        this.books = arrayOfBooks;
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(react_native_elements_1.SearchBar, { noIcon: true, lightTheme: true, placeholder: 'Tytu\u0142, autor', onChangeText: (text) => this.searchingPhrase = text }),
            react_1.default.createElement(react_native_elements_1.Button
            // disabled={(this.state.isDisSearchingButton)}
            , { 
                // disabled={(this.state.isDisSearchingButton)}
                onPress: () => { this.onButtonPressed(); }, title: 'Szukaj' }),
            react_1.default.createElement(react_native_1.FlatList, { data: this.books, renderItem: ({ item }) => react_1.default.createElement(react_native_elements_1.ListItem, { title: item.title }) })));
    }
}
exports.default = SearchComponent;
const styles = react_native_1.StyleSheet.create({});
