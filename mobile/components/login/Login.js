import {StatusBar} from 'expo-status-bar';
import {Image, Pressable, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {Video} from 'expo-av';
import React, {useEffect, useCallback} from 'react';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LeftArrow from '../.././assets/images/login/Arrow 4.svg';
import Mark from '../.././assets/images/login/xMark.svg';
import DecorLogin from '../.././assets/images/login/Login Decor Thing.svg';
import Registration from "../registration/Registration";
import Footer from "../footer"

export default function Login({ navigation }) {
    const pressHandler = () => {
        navigation.navigate('Registration')
    }

    return (
        <View style={styles.container} >
            <Video
                source={require('../.././assets/video/background.mp4')}
                style={styles.video}
                resizeMode="cover"
                shouldPlay
                isLooping
            />
            <View style={{flex: 0.5}}>

            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Pressable onPress={pressHandler}>
                    <Text style={styles.signIn}>
                        SIGN-IN
                    </Text>
                    <LeftArrow style={styles.arrow}/>
                </Pressable>
                <Mark style={styles.xMark}/>
            </View>
            <DecorLogin style={styles.loginThing}/>
            <View style={styles.main}>
                <Text style={styles.mainText}>FOR MEMBERS</Text>
                <TextInput style={styles.emailInput} placeholder="E-MAIL" placeholderTextColor='white'>
                </TextInput>
                <TextInput style={styles.passwordInput} placeholder="PASSWORD" placeholderTextColor='white'>
                </TextInput>
                <Text style={styles.forgotPassword}>
                    I forgot password
                </Text>
                <Pressable style={styles.enterButton}>
                    <Text style={styles.buttonText}>
                        ENTER
                    </Text>
                </Pressable>
                <Pressable style={styles.googleButton}>
                    <Text style={styles.googleButtonText}>
                        Log-in with Google
                    </Text>
                </Pressable>
            </View>
            <Footer/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    xMark: {
        left: '3%',
        position: 'absolute',
        borderBottomColor: 'black',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    signIn: {
        left: '70%',
        color: 'white',
        fontFamily: 'VCR_OSD_MONO',
        fontSize: '18px',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
    },
    arrow: {
        position:"absolute",
        top: '20%',
        left: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
    },
    main: {
        flex: 11,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },

    mainText: {
        top: '15%',
        position: "absolute",
        color: 'white',
        fontStyle: 'normal',
        fontSize: '56px',
        fontFamily: 'VCR_OSD_MONO',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 2, height: 2.3},
        textShadowRadius: 5.5
    },

    forgotPassword: {
        fontSize: '16px',
        fontStyle: 'normal',
        lineHeight: '18px',
        color: 'white',
        bottom: '1%',
        textDecorationLine: 'underline',
        fontFamily: 'VCR_OSD_MONO'
    },

    enterButton: {
        top: '4%',
        color: '#DB2525',
        width: 175,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DB2525',
    },

    googleButton: {
        color: '#DB2525',
        width: 175,
        height: 35,
        top: '6%',
        alignItems: 'center',
        backgroundColor: '#3124D0',
        justifyContent: 'center',
    },

    buttonText: {
        color: 'white',
        fontStyle: 'normal',
        fontSize: '20px',
        fontWeight: '400',
        fontFamily: 'VCR_OSD_MONO',
        lineHeight: '47px',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 40,
        alignItems: 'center'
    },

    googleButtonText: {
        paddingVertical: 12,
        position: "absolute",
        color: 'white',
        fontStyle: 'normal',
        fontSize: '14px',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 40,
        fontFamily: 'VCR_OSD_MONO',
    },

    loginThing: {
        position: 'absolute',
        top: '30%',
        left: '2%',
    },
    emailInput: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        bottom: '7%',
        backgroundColor: '#1F1F1F',
        width: '60%',
        color: 'white',
        fontStyle: 'normal',
        fontSize: '20px',
        fontWeight: '400',
        fontFamily: 'VCR_OSD_MONO',
        lineHeight: '47px',
        textAlign: 'center'

    },
    passwordInput: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        backgroundColor: '#1F1F1F',
        width: '60%',
        bottom: '4%',
        fontFamily: 'VCR_OSD_MONO',
        color: 'white',
        fontStyle: 'normal',
        fontSize: '20px',
        fontWeight: '400',
        lineHeight: '47px',
        textAlign: 'center'
    }

});
