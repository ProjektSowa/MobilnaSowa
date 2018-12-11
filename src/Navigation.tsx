import {createStackNavigator, createSwitchNavigator, createAppContainer} from "react-navigation";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import SearchComponent from "./components/SearchComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import {LoadingScreen} from "./components/BootstrapComponent/BootstrapComponent";
import * as React from "react";
import {Body, Button, Header, Icon, Left, Title} from "native-base";

const AppStack = createStackNavigator({
		Home: HomeComponent,
		SearchComponent: SearchComponent,
	},{
		initialRouteName: 'Home',
		headerMode: "none"
	});

const AuthStack = createStackNavigator({SignInScreen:  AuthComponent})


export default createAppContainer(createSwitchNavigator({
		LoadingScreen: LoadingScreen,
		App : AppStack,
		Auth : AuthStack
	},{
		initialRouteName: 'LoadingScreen',
		backBehavior: "none",
	})
)
