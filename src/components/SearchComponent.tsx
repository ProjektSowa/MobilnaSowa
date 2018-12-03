import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, FlatList, ScrollViewComponent} from 'react-native';
import {sendRequest} from "../Services/Redux/endpointConnection";
import {SearchBar, Button} from "react-native-elements";

type Props = {}

export default class SearchComponent extends Component <Props, {records : [], isDisSearchingButton: true}>{

    permalink : string = ""
    searchingPhrase : string = ""
    isDisSearchingButton : boolean = false

    constructor(props : Props) {
        super(props)
        this.state = {records : [], isDisSearchingButton: true}
    }
    onButtonPressed = async () => {
        this.setState({isDisSearchingButton: true})
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

    }

    render() {

        return (
            <View>
                <SearchBar
                    noIcon
                    lightTheme
                    placeholder='Tytuł, autor'
                    // onChangeText={(text) => this.searchingPhrase = text}
                />
                <Button
                    // disabled={(this.state.isDisSearchingButton)}
                    onPress={() => { this.onButtonPressed() }}
                    title='Szukaj' />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});