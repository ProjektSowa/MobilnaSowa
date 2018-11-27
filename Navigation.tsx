import {createStackNavigator} from "react-navigation";
import AuthComponent from "./src/components/AuthComponent/AuthComponent";
import SecondView from "./src/components/secondview";
import SearchComponent from "./src/components/SearchComponent";
import HomeComponent from "./src/components/HomeComponent/HomeComponent";

const RootStack = createStackNavigator({
        Home: { screen: HomeComponent },
        Auth: { screen: AuthComponent },
        SearchComponent: { screen: SearchComponent }
    },
    {
        initialRouteName: 'Home'
    });

export default RootStack;
