import { Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import {Video} from 'expo-av';
import React, {useRef} from 'react';
import LeftArrow from '../.././assets/images/login/Arrow 4.svg';
import Mark from '../.././assets/images/login/xMark.svg';
import DecorLogin from '../.././assets/images/login/Login Decor Thing.svg';
import Footer from "../footer"


export default function Login({navigation}) {
    const pressHandler = () => {

    }

    return (
        <View style={{flex: 1}}>
            <Video
                source={require('../.././assets/video/background.mp4')}
                style={{position: 'absolute', width: '100%', height: '100%'}}
                resizeMode="cover"
                shouldPlay
                isLooping
            />
            <View style={{flex: 0.5}}>

            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View>
                    <Text style={styles.signIn}>
                        SWIPE TO SIGN-IN
                    </Text>
                    <LeftArrow style={styles.arrow}/>
                </View>
                <Mark style={styles.xMark}/>
            </View>
            <DecorLogin style={styles.loginThing}/>
            <View style={styles.main}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.mainText}>FOR MEMBERS</Text>
                    <TextInput style={styles.emailInput} placeholder="E-MAIL" placeholderTextColor='white'>
                    </TextInput>
                    <TextInput style={styles.emailInput} secureTextEntry={true} placeholder="PASSWORD"
                               placeholderTextColor='white'>
                    </TextInput>
                </View>
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
    xMark: {
        left: '3%',
        position: 'absolute',
        borderBottomColor: 'black',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    signIn: {
        left: '45%',
        color: 'white',
        fontFamily: 'VCR_OSD_MONO',
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 1,
    },
    arrow: {
        position: "absolute",
        top: '20%',
        left: '90%',
        opacity: 1
    },
    main: {
        flex: 11,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainText: {
        flex: 2,
        top: '15%',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 56,
        fontFamily: 'VCR_OSD_MONO',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 2, height: 2.3},
        textShadowRadius: 5.5
    },

    forgotPassword: {
        flex: 1,
        fontSize: 16,
        fontStyle: 'normal',
        lineHeight: 18,
        color: 'white',
        top: '2%',
        textDecorationLine: 'underline',
        fontFamily: 'VCR_OSD_MONO'
    },

    enterButton: {
        bottom: '33%',
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
        bottom: '30%',
        alignItems: 'center',
        backgroundColor: '#3124D0',
        justifyContent: 'center',
    },

    buttonText: {
        color: 'white',
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'VCR_OSD_MONO',
        lineHeight: 47,
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
        fontSize: 14,
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
        backgroundColor: '#1F1F1F',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'VCR_OSD_MONO',
        marginVertical: '3%',
        textAlign: 'center',
        height: '15%',
        width: 250
    }
});
