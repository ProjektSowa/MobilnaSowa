import React from 'react';
import {NavigationScreenProp} from "react-navigation";
import {ActivityIndicator, AsyncStorage, StatusBar} from "react-native";
import {View} from "native-base";

interface NavigateProps {
	navigation: NavigationScreenProp<any, any>
}

export class LoadingScreen extends React.Component<NavigateProps, any> {
	constructor(props : NavigateProps) {
		super(props);
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate(userToken ? 'App' : 'Auth')

	};

	// Render any loading content that you like here
	render() {
		return (
			<View>
			</View>
		);
	}
}