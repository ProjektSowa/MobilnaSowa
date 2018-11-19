import React, {Component} from 'react';
import {StyleSheet, Text, Button, TextInput, View, FlatList, ScrollViewComponent} from 'react-native';
import {sendRequest} from "../Services/Redux/endpointConnection";

type Props = {}

export default class SearchComponent extends Component <Props, {records : []}>{

    permalink : string = ""
    records = []

    constructor(props : Props) {
        super(props);
        this.state = {records: []}
    }
    onButtonPressed = async () => {
        // console.log("Kliknięto button")
        await this.getWordPermaLink()
        // console.log("permalink " + this.permalink)
        // await this.retreivePage()
        // console.log("records: " + this.state.records)
    }

    getWordPermaLink = async () => {
        console.log(await sendRequest([
            [ "GetWordsPermalink",[["analiza matematyczna 2", "gewert"]]],
            [ "AccountCheck", ["testsowa@pswbp.pl"]]
        ]));
        // alert("get word permalink")
        // await fetch('http://testsowa.pswbp.pl/capi.php', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "auth": [
        //             1,
        //             "urn:uuid:4dd12e7a-7572-4829-b0fe-e13fef752fda",
        //             "#iqvbW!JhHch+TW._(+z",
        //             "42699@lic528.sowa"
        //         ],
        //         "exec": [
        //             [
        //                 "GetWordsPermalink",
        //                 [["analiza matematyczna 2","gewert"]]
        //             ]
        //         ]
        //     }),
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok.')
        //         }
        //
        //         console.log('mam permalink')
        //
        //         return response.json()
        //     })
        //     .then((responseJson) => {
        //         if (responseJson[0].status === 200) {
        //             this.permalink = responseJson[0].data
        //         }
        //         else
        //             alert('Zły login lub hasło')
        //     })
        //     .catch((error) => {
        //         // alert("Mamy błędy")
        //         console.log(error)
        //     })
    }

    retreivePage = async (pageNr : number = 1) => {
        await fetch('http://testsowa.pswbp.pl/capi.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "auth": [
                    1,
                    "urn:uuid:4dd12e7a-7572-4829-b0fe-e13fef752fda",
                    "#iqvbW!JhHch+TW._(+z",
                    "42699@lic528.sowa"
                ],
                "exec": [
                    [
                        "RetrievePage",
                        [this.permalink, pageNr, "json", "loans"]
                    ]
                ]
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.')
                }
                console.log("oddaję stronę")
                return response.json()
            })
            .then((responseJson) => {
                if (responseJson[0].status === 200) {
                    this.records = responseJson[0]
                    this.setState({records : responseJson[0].data})
                }
                else
                    console.log()
                    // alert('Zły login lub hasło')
            })
            .catch((error) => {
                //alert("Mamy błędy")
                console.log(error)
            })
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder='Tytuł, autor'/>
                <View style={styles.button}>
                    <Button title={'Szukaj'} onPress={() => { this.onButtonPressed() }}></Button>
                </View>
                <View style={styles.listView}>
                    <FlatList
                        data={ this.state.records }
                        renderItem={({item}) => <Text>{item}</Text>}
                    />
                </View>
                <View>
                    <Text>{ JSON.stringify(this.state.records) }</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
      flex: 1
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        minHeight: 100
    },
    input: {
        minHeight: 15,
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
        minWidth: 150,
        paddingLeft: 5,
        paddingVertical: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
    button: {

    }
});