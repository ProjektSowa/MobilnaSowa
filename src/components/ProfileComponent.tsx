import React from 'react';
import Barcode from 'react-native-barcode-builder';
import {StyleSheet, Text,ImageBackground, View} from 'react-native';
import {sendRequest} from "../Services/Redux/endpointConnection";
import {connect} from 'react-redux';

//npm install react-native-barcode-builder --save
//npm install react-native-svg --save && react-native link react-native-svg

interface AuthState {
    authData: any,
    authData2: any
}



class Profile extends React.Component<AuthState,{validationDate : any}> {

    constructor(props : AuthState) {
        super(props);
        this.state = {
            validationDate : "Data",
        };
    }
    componentWillMount(): void {
 // this.getValidationDate()
    }



    getValidationDate = async () => {
        let exec = [
           "AccountStatus",
        [this.props.authData.user_id,this.props.authData.key]
       ];
        let response = await sendRequest([exec]);
        let parsedJson = JSON.stringify(response['AccountStatus']);
        parsedJson = parsedJson.substring(1,parsedJson.length-1);
        parsedJson = JSON.parse(parsedJson);

        this.setState({ validationDate: parsedJson['validto']});
        console.log(this.state.validationDate)
    };

    render() {
        console.log(this.props)
        return(
            <ImageBackground style={styles.background} source={require('../../assets/images/psw-bg.jpg')}>

                <View style={styles.container}>
                    <Text style={styles.nameEnlarge}>{this.props.authData2.name}</Text>
                    <Text style={styles.blackColor}>{this.props.authData2.category.desc}</Text>
                    <Text style={styles.blackColor}>Konto wazne do : {this.state.validationDate}</Text>
                    <Barcode value={this.props.authData2.barcode}/>
                </View>

            </ImageBackground>
        )
    }
}

function mapStateToProps({session} : any){
	console.log(session)
    return {
        authData : {...session.authData},
        authData2 : {...session.authData2}
    }
}

export default connect(mapStateToProps)(Profile)




const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        minHeight: 100

    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    nameEnlarge :{
        color : 'blue',
        fontSize : 24,
        paddingVertical: 5
    },
    blackColor :{
        color: 'black',
        fontSize: 16,
        paddingVertical : 2
    }
});