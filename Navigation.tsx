import {createStackNavigator} from "react-navigation";
import AuthComponent from "./src/components/AuthComponent/AuthComponent";
import SecondView from "./src/components/secondview";
import SearchComponent from "./src/components/SearchComponent";

const RootStack = createStackNavigator({
        Auth: { screen: AuthComponent },
        Second: { screen: SearchComponent }
    },
    {
        initialRouteName: 'Auth'
    });

export default RootStack;
