import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, ScrollViewComponent} from 'react-native';
import {sendRequest} from "../Services/Redux/endpointConnection";
import {SearchBar, Button, ListItem} from "react-native-elements";
import {Book, BorrowBook} from "./Book";
import {NavigationScreenProp} from "react-navigation";

type Props = {
    lang : any
    navigation: NavigationScreenProp<any, any>
}

export default class SearchComponent extends Component <Props, {records : [], isDisSearchingButton: true}>{

    permalink : string = "";
    searchingPhrase : string = "";
    isDisSearchingButton : boolean = false;
    books : Array<Book> = new Array<Book>();

    constructor(props : any) {
        super(props)
        this.state = {records : [], isDisSearchingButton: true}
    }
    onButtonPressed = async () => {
        this.setState({isDisSearchingButton: true});
        console.log(this.searchingPhrase);
        if (this.searchingPhrase === "") {
            alert("Złe dane wejściowe")
        }
        else {
            let keyWords = this.searchingPhrase.split(/\s+/);
            console.log('keyWords')
            console.log(keyWords)
            await this.getWordPermaLink(keyWords)
            await this.retreivePage()
        }
        // this.setState({isDisSearchingButton: false})
    }

    getWordPermaLink = async (keyWords : Array<any>) => {
        let response = await sendRequest([
            [ "GetWordsPermalink",[keyWords]]
        ]);
        console.log('otrzymałem odpowiedz: ' + response);
        console.log(response);
        this.permalink = response.GetWordsPermalink[0];

    }

    retreivePage = async (pageNr : number = 1) => {
        let exec = [
            [
                "RetrievePage",[this.permalink, pageNr, "json", "loans"]
            ],
            [
                "RetrievePage",[this.permalink, pageNr, "json", "marc21"]
            ]
        ];
        let response = await sendRequest(exec)
        console.log(response)
        this.convertResponse(response);
    }

    convertResponse(response: any) {
        let arrayOfBooks = new Array<Book>();
        let book;
        for (let k = 0; k < response.RetrievePage[0].records.length; k++){
            //loans
            let loans = response.RetrievePage[0].records[k].view;
            let arrayBorrow = new Array<BorrowBook>();
            for (let i = 0; i < loans.length; i++){
                let borrowBook = new BorrowBook(loans[i][0], loans[i][1], loans[i][2], loans[i][3], loans[i][4], loans[i][5], loans[i][6], loans[i][7])
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
                switch(marc21[j][0]){
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
            book = new Book(author, title, publisher, ISBN, description, arrayBorrow);
            arrayOfBooks.push(book);
        }
        console.log(arrayOfBooks);
        this.books = arrayOfBooks;
    }

    render() {
        return (
            <View>
                <SearchBar
                    noIcon
                    lightTheme
                    placeholder='Tytuł, autor'
                    onChangeText={(text) => this.searchingPhrase = text}
                />
                <Button
                    // disabled={(this.state.isDisSearchingButton)}
                    onPress={() => { this.onButtonPressed() }}
                    title='Szukaj' />
                <FlatList data={this.books}
                          renderItem={({item}) =>
                              <ListItem onPress={() =>
                              {
                              return this.props.navigation.navigate('DetailsView',{'item':item});
                              }}
                              title={item.title} />}
                              />

            </View>
        )
    }
}

const styles = StyleSheet.create({

});