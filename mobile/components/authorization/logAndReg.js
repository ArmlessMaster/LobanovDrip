import * as React from 'react';
import {useWindowDimensions, View} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Registration from "./RegistrationScreen";
import Login from "./LoginScreen";
import {createStackNavigator} from "react-navigation-stack";
import Navigation from "../../navigation/navigation";
import Search from "../search/Search";


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

export default function TabViewExample() {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first'},
        { key: 'second'},
    ]);
    return (
        <TabView
            screenOptions={{animationEnabled: false}}
            renderTabBar={() => null}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}
