import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Registration from "./registration/Registration";
import Login from "./login/Login";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

const FirstRoute = () => (
    <Login/>
);

const SecondRoute = () => (
    <Registration/>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

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

export default function TabViewExample(indexScreen) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);
    const navStack = createStackNavigator(screens);
    return (
        <TabView
            renderTabBar={() => null}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}
