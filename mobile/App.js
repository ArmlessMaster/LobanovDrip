import React, { useEffect, useCallback } from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Search from "./components/search/Search";
import Login from "./components/authorization/Login"
import ChangePassword from "./components/authorization/ChangePassword"
import Navigation from "./navigation/navigation";
import navigation from "./navigation/navigation";
import { useAuth } from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import 'localstorage-polyfill';

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
                <Navigation/>
            </View>
        </AuthContext.Provider>

      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});