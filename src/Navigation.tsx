import {createStackNavigator, createSwitchNavigator, createAppContainer} from "react-navigation";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import SearchComponent from "./components/SearchComponent";
import NewsComponent from "./components/NewsComponent/NewsComponent";
import UserProfile from "./components/ProfileComponent"
import DetailsView from "./components/DetailsView";
import {LoadingScreen} from "./components/BootstrapComponent/BootstrapComponent";
import * as React from "react";
import {Body, Button, Header, Icon, Left, Title} from "native-base";

const AppStack = createStackNavigator({
		News: NewsComponent,
		SearchComponent: SearchComponent,
		DetailsView: DetailsView,
		Profile: UserProfile
	},{
		initialRouteName: 'News',
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
