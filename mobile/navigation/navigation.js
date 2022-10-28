import {createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../components/login/Login"
import Registration from "../components/registration/Registration"


const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
        }
    },
    Registration: {
        screen: Registration,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
        }
    }
}


const navStack = createStackNavigator(screens);

export default createAppContainer(navStack);

