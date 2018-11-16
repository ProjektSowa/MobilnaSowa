import {createStackNavigator} from "react-navigation";
import AuthComponent from "./src/components/AuthComponent/AuthComponent";
import SecondView from "./src/components/secondview";

const RootStack = createStackNavigator({
        Auth: { screen: AuthComponent },
        Second: { screen: SecondView }
    },
    {
        initialRouteName: 'Auth'
    });

export default RootStack;
