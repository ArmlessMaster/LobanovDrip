import {createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LogAndReg from "../components/authorization/logAndReg"
import Search from "../components/search/Search";
import Login from "../components/authorization/LoginScreen";
import Registration from "../components/authorization/RegistrationScreen";
import {NavigationContainer} from "@react-navigation/native";
import navigation from "./navigation";

const SwipeTabs = createStackNavigator({
    Search: {screen: Search},
    Login: { screen: Login},
    Registration: {screen: Registration}
}, {
    initialRouteName: 'Login', headerMode: 'none' , animationEnabled: true, tabBarOptions: {
        showLabel: false, showIcon: false, style: {height: 0}, onSwipeLeft(gestureState) {
        }
    }
})

export default createAppContainer(SwipeTabs);
