import {createStackNavigator} from "react-navigation";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import SecondView from "./components/secondview";
import SearchComponent from "./components/SearchComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";

const RootStack = createStackNavigator({
        Home: { screen: HomeComponent },
        Auth: { screen: AuthComponent },
        SearchComponent: { screen: SearchComponent }
    },
    {
        initialRouteName: 'Home'
    });

export default RootStack;
