import React, { useEffect, useCallback } from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Search from "./components/search/Search";
import Login from "./components/authorization/Login"
import ChangePassword from "./components/authorization/ChangePassword"
import Navigation from "./navigation/navigation";
import navigation from "./navigation/navigation";
import TestTest from "./components/test/test";
import STDTest from "./components/test/STDTest";
import { useAuth } from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import 'localstorage-polyfill';
import SwipeToDelete from "./components/test/example/swipe_to_delete";
import Store from "./components/store/Store";
import FirstHeader from "./components/store/FirstHeader";
import SecondHeader from "./components/store/SecondHeader";
import ItemPage from "./components/itemPages/ItemPage";

export default function App() {

    const [fontsLoaded] = useFonts({
        'inter-medium': require('./assets/fonts/Inter-Medium.ttf'),
        'roboto-light-i': require('./assets/fonts/Roboto-LightItalic.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'VCR_OSD_MONO': require('./assets/fonts/VCR_OSD_Mono.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'inter-regular': require('./assets/fonts/Inter-Regular.otf')
    });

      useEffect(() => {
          async function prepare() {
              await SplashScreen.preventAutoHideAsync();
          }
          prepare();
      }, []);
    const { token, login, logout, ready } = useAuth();
    const isAuthenticated = !!token;
    const onLayoutRootView = useCallback(async () => {
          if (fontsLoaded) {
              await SplashScreen.hideAsync();
          }
      }, [fontsLoaded]);

      if (!fontsLoaded) {
          return null;
      }

    StatusBar.setBarStyle('light-content', true);


    return (
        <AuthContext.Provider value={{
            token,
            login,
            logout,
            isAuthenticated,
        }}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                {/*<View style={{flex: 12.5}}><LoginAndRegistration/></View>*/}
                {/*<View style={{flex: 1}}>*/}
                {/*    <Footer/>*/}
                {/*</View>*/}
                {/*<Navigation/>*/}
                <TestTest/>
            </View>
        </AuthContext.Provider>

      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});