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

	_bootstrapAsync = async () => {
		this.props.navigation.navigate('News')

	};
	render() {
		return (
			<View>
			</View>
		);
	}
}