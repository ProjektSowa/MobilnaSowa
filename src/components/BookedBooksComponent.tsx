import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {sendRequest} from "../Services/Redux/endpointConnection";
import {ListItem} from "react-native-elements";
import {Book, BorrowBook} from "./Book";

type Props = {
    lang : any
}

export default class BookedBooksComponent extends Component <Props,any>{

    books : Array<Book> = new Array<Book>();
    rawBooks : Array<rawBook> = new Array<rawBook>();

    key = ""
    user_id = ""

    validTo = ""
    validFrom = ""
    isConfirmed = false

    booksBooked = 0
    booksLoaned = 0


    constructor(props : Props) {
        super(props)

        this.state = {
                myText: '', tableTitle: ['Tytuł', 'Autor', 'Wydawnictwo', 'ISBN', "Opis"]

        };
    }
    onButtonPressed = async () => {
            await this.accountLink()
            await this.accountStatus()
    }

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

        this.key = response.AccountLink[0].key
        this.user_id = response.AccountLink[0].user_id
    }

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

        console.log(response);

        this.validTo = response.AccountStatus[0].validto
        this.validFrom = response.AccountStatus[0].validfrom
        this.isConfirmed = response.AccountStatus[0].confirmed
        this.booksLoaned = response.AccountStatus[0].loaned.length
        this.booksBooked = response.AccountStatus[0].booked.length

        //console.log(response.AccountStatus[0].loaned[0])

        //await this.retreiveRecords();
        await this.getListofRecords(response)
        //await this.convertResponse(response)
        this.updateText()
    }

    getListofRecords(response: any){
        //let arrayOfResponses = new Array<Object>();
        //let newresponse;
        for (let k = 0; k < response.AccountStatus[0].loaned.length; k++){
            //arrayOfResponses.push(
            //let myBooks =
                this.retreiveRecords(response.AccountStatus[0].loaned[k].rec_id,response.AccountStatus[0].loaned[k].ipub_id)
            //console.log(myBooks)
            console.log(this.books);
        //)
            }
        //console.log(arrayOfResponses);
        //console.log(arrayOfResponses[0]);
        //console.log(arrayOfResponses[0]._55.RetrieveRecords[0]);
        //this.convertResponse(response);

        //this.updateText()
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

        //console.log(response);

        //console.log(response.RetrieveRecords[0].length);
        //console.log(response.RetrieveRecords[0][0].view);
        //console.log(response.RetrieveRecords[1][0].view.data);

        //return
        this.convertResponse(response);
    }

    updateText = () => {
        this.setState({myText: ''})
    }

    convertResponse(response: any) {
        let arrayOfBooks = new Array<Book>();
        let book;
        for (let k = 0; k < response.RetrieveRecords[0].length; k++){
            //loans
            let loans = response.RetrieveRecords[0][k].view;
            let arrayBorrow = new Array<BorrowBook>();
            for (let i = 0; i < loans.length; i++){
                let borrowBook = new BorrowBook(loans[i][0], loans[i][1], loans[i][2], loans[i][3], loans[i][4], loans[i][5], loans[i][6], loans[i][7])
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
            arrayOfBooks.push(book);
            //arrayOfBooks.join()

        }
        //return arrayOfBooks;
      //  console.log(arrayOfBooks);

        this.books = arrayOfBooks;

       //this.books.push(arrayOfBooks);
       // console.log(this.books);
       this.updateText()


        //<FlatList data={this.books}
        //renderItem={({item}) => <Text>{item.title} {item.ISBN}</Text>}
        //keyExtractor={(item, isbn) => isbn.toString()}
        ///>
    }

    updateArray(){

    }

    render() {
        return <View>
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


            <FlatList data={this.books}
                      renderItem={({item}) =>

                          <ListItem onPress={() =>
                          {
                              alert("\n----------\nBook Title\n----------\n" + item.title + "\n----------\nAuthor\n----------\n" + item.author + "\n----------\nDescribtion\n----------\n" + item.description );
                              //return this.props.navigation.navigate('DetailsView',{'item':item});
                          }}
                                    title={item.title} />}
                      keyExtractor={(item, isbn) => isbn.toString()}
            />

            <Text>
                {this.state.myText}
            </Text>
        </View>
    }
}

const styles = StyleSheet.create({

});

export class rawBook {
    rec_id: string;
    ipub_id: string;

    constructor(rec_id: string, ipub_id: string) {
        this.rec_id = rec_id;
        this.ipub_id = ipub_id;
    }
}