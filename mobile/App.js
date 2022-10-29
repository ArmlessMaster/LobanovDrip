import React, { useEffect, useCallback } from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import LoginAndRegistration from "./components/logAndReg"
<<<<<<< HEAD
// import Navigation from "./navigation/navigation";
import Filter from "./components/filter/Filter"
import {FilterButtonGroup} from "./components/filter/FilterButtonGroup";
=======
import Search from "./components/search/Search";
import Footer from "./components/footer";

>>>>>>> 61d7bb92b1b0e9b77725ad056d50f202ce43d5bc

export default function App() {
    const [fontsLoaded] = useFonts({
        'vsr-osd-mono': require('./assets/fonts/VCR_OSD_MONO_1.001.ttf'),
        'inter-medium': require('./assets/fonts/Inter-Medium.ttf'),
        'roboto-light-i': require('./assets/fonts/Roboto-LightItalic.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
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
<<<<<<< HEAD
              {/*<LoginAndRegistration/>*/}
              <Filter/>
=======
              <View style={{flex: 12.5}}><LoginAndRegistration/></View>
              <View style={{flex: 1}}>
                  <Footer/>
              </View>
>>>>>>> 61d7bb92b1b0e9b77725ad056d50f202ce43d5bc
          </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});