import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect} from 'react';
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import ClothingCompanyJP from "../../assets/images/clothingCompanyJP.svg";
import Kharkiv from "../../assets/images/KHARKIV.svg";
import Scull from '../../assets/images/scull.svg';
import Christ from '../../assets/images/Christ.svg';
import Arrow from '../../assets/images/Arrow 4.svg';
import DecorJP from '../../assets/images/Decor Jpn.svg';
import Decor from '../../assets/images/Registration Decor Thing.svg';


export const Registration = () => {
    const [fontsLoaded] = useFonts({
        'VCR OSD Mono': require('../../assets/fonts/VCR_OSD_MONO_1.001.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{flex: 1, backgroundColor: "#0D0D0D"}}>
            <View style={{backgroundColor: 'black', flex: 0.5}}></View>
            <View style={{
                flex: 1,
                backgroundColor: 'black',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Pressable style={{flex: 1}}>
                    <Christ style={{left: '20%'}}></Christ>
                </Pressable>
                <View style={{flex: 1}}></View>
                <Pressable style={{flex: 1, flexDirection: 'row'}}>
                    <Arrow style={{flex: 1, right: '3%', top: '2%'}}></Arrow>
                    <Text style={styles.loginText}>LOGIN-IN</Text>
                </Pressable>
            </View>
            <View style={{flex: 11, alignItems: 'center'}}>
                <Kharkiv style={{position: 'absolute', right: 0, bottom: 0}}></Kharkiv>
                <ClothingCompanyJP style={{position: 'absolute', left: '5%', bottom: '10%'}}></ClothingCompanyJP>
                <Scull style={{position: 'absolute', top: '2%', left: '5%'}}></Scull>
                <DecorJP style={{position: 'absolute', top: '3%', right: '5%'}}></DecorJP>
                <Decor style={{position: 'absolute', right: '1%', top: '30%'}}>
                </Decor>
                <Text style={styles.headerText}>IS THIS YOUR FIRST VISIT?</Text>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
                </Pressable>
                <Text style={styles.text}>
                    <Text>Read the </Text>
                    <Text style={{textDecorationLine: 'underline'}}>Privacy Policy, Rules and Site Selection
                        Guidelines</Text>
                </Text>
            </View>
            <View style={{flex: 1, backgroundColor: 'black'}}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '70%',
        height: '5%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#DB2525',
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "VCR OSD Mono",
    },
    text: {
        flex: 2,
        color: "#FFFFFF",
        top: '5%',
        textAlign: "center",
        fontSize: 18,
        fontFamily: "VCR OSD Mono",
        width: '85%'
    },
    headerText: {
        flex: 1,
        top: '15%',
        height: 100,
        color: "#FFFFFF",
        fontSize: 44,
        textAlign: "center",
        fontFamily: "VCR OSD Mono",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
    },
    loginText: {
        flex: 1, left: '5%', color: 'white', fontSize: 18, fontFamily: 'VCR OSD Mono'
    }
});