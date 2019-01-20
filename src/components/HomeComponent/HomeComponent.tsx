import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationScreenProp, NavigationScreenProps, withNavigation} from "react-navigation";
import {Button, Container, Header, Icon, Left, Text, Title, Body, Content, Right} from "native-base";
import withTranslation from "../../Services/Translate/WithTranslate";

interface NavigateProps {
    lang : any
    navigation: NavigationScreenProp<any, any>
}

@withTranslation()
class HomeComponent extends Component<NavigateProps, any>{

    constructor(props : any) {
        super(props)
    }

    render() {
        let { lang } = this.props;
        return (
            <Container>
                <Content>
                    <Header searchBar>
                        <Left/>
                            <Body>
                                <Title>{lang.title}</Title>
                            </Body>
                        <Right>
	                        <Button transparent>
		                        <Icon name='person' />
	                        </Button>
                        </Right>
                    </Header>
	                <Button onPress={() => {return this.props.navigation.navigate('SearchComponent')}}>
		                <Text>{"SearchComponent"}</Text>
	                </Button>
                </Content>

            </Container>
        );
    }
}

export default withNavigation(HomeComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    }
});
