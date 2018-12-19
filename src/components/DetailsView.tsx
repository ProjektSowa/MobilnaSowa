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

export default class DetailsView extends React.Component<NavigateProps,any>{
    book:Book
    constructor(props : any) {
        super(props);
        this.state =
            {
                tableTitle: ['Tytuł', 'Autor', 'Wydawnictwo', 'ISBN'],
                tableData: [

                ]
            }

    }

    render() {
        const { navigation } = this.props
        console.log(this.book);
        this.book = navigation.getParam('item');
        this.state.tableData.push(new Array(this.book.title))
        this.state.tableData.push(new Array(this.book.author))
        this.state.tableData.push(new Array(this.book.publisher))
        this.state.tableData.push(new Array(this.book.ISBN))

        const state = this.state;



        return (
            <View>

                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableTitle} style={styles.title} heightArr={[34,28,34,28]}  textStyle={styles.text}/>
                        <Rows data={state.tableData} flexArr={[1, 2]} heightArr={[34,28,34,28]} textStyle={styles.text}/>
                    </TableWrapper>
                </Table>
                <Text>{this.book.description}</Text>
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
