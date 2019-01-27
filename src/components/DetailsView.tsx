import React, {Component} from 'react';
import {NavigationScreenProp, NavigationScreenProps, withNavigation} from "react-navigation";
import {SearchBar, Button, ListItem,Text} from "react-native-elements";
import {Book, BorrowBook} from "./Book";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {StyleSheet, View} from "react-native";

interface NavigateProps {
    lang : any
    navigation: NavigationScreenProp<any, any>
}
let book:Book
export default class DetailsView extends React.Component<NavigateProps,any>{


    constructor(props : any) {
        super(props);
        const { navigation } = this.props
        book = navigation.getParam('item');

        this.state =
            {
                tableTitle: ['Tytuł', 'Autor', 'Wydawnictwo', 'ISBN','Dostępne'],
                tableData: [

                ]
            }

    }

    borrowClick(){

        if(book.borrowBook[0].availableBooks > 0)
        {
            console.log('Rezerwuje')
            book.borrowBook[0].availableBooks - 1;

        }
    }
    render() {

        console.log(book);
        this.state.tableData.push(new Array(book.title))
        this.state.tableData.push(new Array(book.author))
        this.state.tableData.push(new Array(book.publisher))
        this.state.tableData.push(new Array(book.ISBN))
        console.log(book.borrowBook)
        this.state.tableData.push(new Array(book.borrowBook[0].availableBooks.toString()))
        const state = this.state;

        return (
            <View>

                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableTitle} style={styles.title} heightArr={[34,28,34,28,28]}  textStyle={styles.text}/>
                        <Rows data={state.tableData} flexArr={[1, 2]} heightArr={[34,28,34,28,28]} textStyle={styles.text}/>
                    </TableWrapper>
                </Table>
                <Button
                    onPress={this.borrowClick}
                    title="Zarezerwuj"
                    color="#c8e1ff"

                />
                <Text>{book.description}</Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa'},

    text: { textAlign: 'center' }
});
