import React, { useEffect, useCallback } from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Authorization from "./components/authorization/Authorization";
import Search from "./components/search/Search";
import Main from "./components/main/Main";
import LogAndReg from "./components/authorization/logAndReg"
import Filter from "./components/filter/Filter";
import Login from "./components/authorization/LoginScreen";
import Navigator from "./navigation/navigation";
import Navigation from "./navigation/navigation";
import {NavigationContainer} from "@react-navigation/native";
import Footer from "./components/footer";
import ChangePassword from "./components/authorization/ChangePassword"

export default function App() {
    const [fontsLoaded] = useFonts({
        'vsr-osd-mono': require('./assets/fonts/VCR_OSD_MONO_1.001.ttf'),
        'inter-medium': require('./assets/fonts/Inter-Medium.ttf'),
        'roboto-light-i': require('./assets/fonts/Roboto-LightItalic.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'VCR_OSD_MONO': require('./assets/fonts/VCR_OSD_MONO_1.001.ttf'),
        'inter-regular': require('./assets/fonts/Inter-Regular.otf')
    });

      useEffect(() => {
          async function prepare() {
              await SplashScreen.preventAutoHideAsync();
          }
          prepare();
      }, []);

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
          <View style={styles.container} onLayout={onLayoutRootView}>
              <ChangePassword/>
          </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});