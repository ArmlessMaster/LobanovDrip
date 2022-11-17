import {CardStyleInterpolators, createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Search from "../components/search/Search";
import Filter from "../components/filter/Filter";
import ChangePassword from "../components/authorization/ChangePassword";
import Authorization from "../components/authorization/Authorization";
import Footer from "../components/footer";
import ItemPage from "../components/itemPages/ItemPage";
import SelectCategory from "../components/categories/SelectCategory"
import ItemsByCategory from "../components/categories/ItemsByCategory"
import SwipeStore from "../components/store/SwipeStore";
import StoreScreen from "../components/store/StoreScreen";
import Collections from "../components/store/Collections";

const screens = {
    SwipeStore:{
        screen: SwipeStore,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            animationEnabled: false
        },
    },
    StoreScreen: {
        screen: StoreScreen,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            animationEnabled: false
        }
    },
    Search: {
        screen: Search,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            animationEnabled: false
        },
    },
    Authorization: {
        screen: Authorization,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            animationEnabled: false
        }
    },
    Filter: {
        screen: Filter,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            animationEnabled: false
        }
    },
    Footer: {
        screen: Footer,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
        }
    },
    ItemPage: {
        screen: ItemPage,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        },
    },
    SelectCategory: {
        screen: SelectCategory,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            animationEnabled: false
        },
    },
    ItemsByCategory: {
        screen: ItemsByCategory,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            animationEnabled: false
        },
    },
    Collections: {
        screen: Collections,
        navigationOptions: {
            headerShown: false,
            tabBarStyle: { display: "none" },
            animationEnabled: false
        },
    }
}


const navStack = createStackNavigator(screens);

export default createAppContainer(navStack);

