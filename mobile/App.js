import React, { useEffect, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import LoginAndRegistration from "./components/logAndReg"
import Search from "./components/search/Search";
import Footer from "./components/footer";


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

      return (
          <View style={styles.container} onLayout={onLayoutRootView}>
              <View style={{flex: 12.5}}><LoginAndRegistration/></View>
              <View style={{flex: 1}}>
                  <Footer/>
              </View>
          </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});