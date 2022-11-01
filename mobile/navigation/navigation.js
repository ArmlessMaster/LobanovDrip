import {createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LogAndReg from "../components/authorization/logAndReg"
import Search from "../components/search/Search";
import Login from "../components/authorization/LoginScreen";
import Registration from "../components/authorization/RegistrationScreen";
import {NavigationContainer} from "@react-navigation/native";
import Filter from "../components/filter/Filter";
import Main from "../components/main/Main";
import Footer from "../components/footer";
import ChangePassword from "../components/authorization/ChangePassword";

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
    },
    Search: {
        screen: Search,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
        }
    },
    Filter: {
        screen: Filter,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
        }
    },
    Main: {
        screen: Main,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
        }
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
        }
    }
}


const navStack = createStackNavigator(screens);

export default createAppContainer(navStack);

