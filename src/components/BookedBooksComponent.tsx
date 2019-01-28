import React, {Component} from 'react';
import {Alert, Button, FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import {sendRequest} from "../Services/Redux/endpointConnection";
import {ListItem} from "react-native-elements";
import {Book, BorrowBook} from "./Book";

type Props = {
    //lang : any
}

export default class BookedBooksComponent extends Component <Props,any>{

    books : Array<Book> = new Array<Book>();

    key = "";
    user_id = "";

    validTo = "";
    validFrom = "";
    isConfirmed = false;

    booksBooked = 0;
    booksLoaned = 0;


    constructor(props : Props) {
        super(props);

        this.state = {
            refreshing: false
        };
    }
    onButtonPressed = async () => {
            await this.accountLink();
            await this.accountStatus()
    };

    accountLink = async () => {
        let response = await sendRequest([
            [
                "AccountLink",
                [
                    "12345678",
                    "Test.Sowa.1",
                    "testsowa@pswbp.pl",
                    "testsowa@pswbp.pl"
                ]
            ]
        ]);

        this.key = response.AccountLink[0].key;
        this.user_id = response.AccountLink[0].user_id
    };

    accountStatus = async () => {
        let response = await sendRequest([
            [
                "AccountStatus",
                [
                    this.user_id,   //user_id
                    this.key        //key
                ]
            ]
        ]);

        this.validTo = response.AccountStatus[0].validto;
        this.validFrom = response.AccountStatus[0].validfrom;
        this.isConfirmed = response.AccountStatus[0].confirmed;
        this.booksLoaned = response.AccountStatus[0].loaned.length;
        this.booksBooked = response.AccountStatus[0].booked.length;

        await this.getListofRecords(response);

        this.updateText()
    };

    getListofRecords(response: any){
        this.books = [];
        for (let k = 0; k < response.AccountStatus[0].loaned.length; k++)
        {
            this.retreiveRecords(response.AccountStatus[0].loaned[k].rec_id,response.AccountStatus[0].loaned[k].ipub_id);
        }
    }

    retreiveRecords = async (rec_id: string, ipub_id: string) => {
        let response = await sendRequest([
            [
                "RetrieveRecords",
                [[rec_id,ipub_id],"json","loans"]
            ],
            [
                "RetrieveRecords",
                [[rec_id,ipub_id],"json","marc21"]
            ]
        ]);
        let book = this.convertResponse(response);
        this.books.push(book);
    };

    updateText = () => {
        this.setState({
            refresh: !this.state.refresh
        })
    };

    convertResponse(response: any):Book {
        //let arrayOfBooks = new Array<Book>();
        let book: Book;
        for (let k = 0; k < response.RetrieveRecords[0].length; k++){
            //loans
            let loans = response.RetrieveRecords[0][k].view;
            let arrayBorrow = new Array<BorrowBook>();
            for (let i = 0; i < loans.length; i++){
                let borrowBook = new BorrowBook(loans[i][0], loans[i][1], loans[i][2], loans[i][3], loans[i][4], loans[i][5], loans[i][6], loans[i][7]);
                arrayBorrow.push(borrowBook);
            }

            //marc21
            let marc21 = response.RetrieveRecords[1][k].view.data;
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
        }
        // @ts-ignore
        return book;
    }

    onRefresh = async () => {
        this.setState({
            isRefreshing: true
        });

        this.setState({
            refresh: !this.state.refresh
        })

        this.setState({
            isRefreshing: false
        });
    };

    render() {
        return <View style={styles.container}>
            <Button
                onPress={() => {
                    this.onButtonPressed()
                }}
                title='Get Data'/>
            <Text>
                {"Account is valid to: "+ this.validTo}
            </Text>
            <Text>
                {"Account created: " + this.validFrom}
            </Text>
            <Text>
                {"Is account confirmed: " +this.isConfirmed}
            </Text>
            <Text>
                {"Numbers of Books Booked: "+this.booksBooked}
            </Text>
            <Text>
                {"Numbers of Books Loaned: "+this.booksLoaned}
            </Text>

            <FlatList

                data={this.books}
                      extraData={this.state.refresh}

                      renderItem={({item}) =>

                          <ListItem onPress={() =>
                          {
                              Alert.alert(item.title,
                                  "\n----------\nAuthor\n----------\n" + item.author +
                                  "\n----------\nDescribtion\n----------\n" + item.description );
                          }}
                                    title={item.title}
                          />
                      }
                        keyExtractor={item => item.ISBN.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})