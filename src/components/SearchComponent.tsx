import React, {Component} from 'react';
import {StyleSheet, Text, Button, TextInput, View, FlatList, ScrollViewComponent} from 'react-native';
import {sendRequest} from "../Services/Redux/endpointConnection";

type Props = {}

export default class SearchComponent extends Component <Props, {records : []}>{

    permalink : string = ""

    constructor(props : Props) {
        super(props);
        this.state = {records: []}
    }
    onButtonPressed = async () => {
        await this.getWordPermaLink()
        await this.retreivePage()
    }

    getWordPermaLink = async () => {
        let response = await sendRequest([
            [ "GetWordsPermalink",[["analiza matematyczna 2", "gewert"]]]
        ]);
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