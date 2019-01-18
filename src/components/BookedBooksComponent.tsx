import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {sendRequest} from "../Services/Redux/endpointConnection";
import {Button, ListItem, Text} from "react-native-elements";
import {Book, BorrowBook} from "./Book";

type Props = {}

export default class BookedBooksComponent extends Component <Props, {validTo : ""}>{

    constructor(props : Props) {
        super(props)

        this.state = {
            validTo: ""
        };
    }
    onButtonPressed = async () => {
            await this.accountStatus()
            //alert(this.myResponse);
    }

    accountStatus = async () => {
        let response = await sendRequest([
            [
                "AccountStatus",
                [
                    "O14074",                                       //user_id
                    "2b666d5a7730386c492c4f34255a2665663b2b31"      //key
                ]
            ]
        ]);

        console.log('otrzymałem odpowiedzs: ' + response);
        //alert(response.toString());
        var data;
        data = JSON.stringify(response);

       // this.setState({
      //      validTo: response.validTo
      //  })
        //data2 = response;
        //data2.getChildContext();
        alert(data);
        //alert(data2.getChildContext("loaned"));
       // this.convertResponse(data);
    }

    render() {
        return <View>
            <Button
                onPress={() => {
                    this.onButtonPressed()
                }}
                title='Wyświetl'/>

        </View>
    }
}

const styles = StyleSheet.create({

});