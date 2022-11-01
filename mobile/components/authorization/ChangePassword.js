import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from 'react';
import ClothingCompanyJP from "../../assets/images/clothingCompanyJP.svg";
import Kharkiv from "../../assets/images/KHARKIV.svg";
import Scull from '../../assets/images/scull.svg';
import Christ from '../../assets/images/Christ.svg';
import Arrow from '../../assets/images/Arrow 4.svg';
import DecorJP from '../../assets/images/Decor Jpn.svg';
import Decor from '../../assets/images/Registration Decor Thing.svg';
import DecorBottom from '../../assets/images/Decor Thing.svg';


export default function ChangePassword({ navigation }) {
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
                    <Pressable style={{flex: 1}} onPress={() => navigation.navigate('Search')}>
                        <Christ style={{left: '6%'}}></Christ>
                    </Pressable>
                    <Pressable style={{flex: 1, flexDirection: 'row'}}  onPress={() => navigation.navigate('Search')}>
                        <Arrow style={{flex: 1,left: '30%', top: '1%'}}></Arrow>
                        <Text style={styles.loginText}>BACK TO MAIN</Text>
                    </Pressable>
                </View>

                <View style={{flex: 11}}>

                    <View style={{flex: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput style={styles.input} placeholder="OLD PASSWORD"
                                   placeholderTextColor='white'></TextInput>
                        <TextInput style={styles.input} secureTextEntry={true} placeholder="NEW PASSWORD"
                                   placeholderTextColor='white'></TextInput>
                        <TextInput style={styles.input} secureTextEntry={true} placeholder="NEW PASSWORD"
                                   placeholderTextColor='white'></TextInput>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>CHANGE</Text>
                        </Pressable>
                    </View>
                    <View style={{position:'absolute', top: '5%', left: '18%'}}>
                        <Text style={{color: 'white',
                            fontFamily: "VCR_OSD_MONO",
                            fontSize: 40,
                            textAlign: 'center'
                        }}>
                            {
                                'CHANGE YOUR\nPASSWORD'
                            }

                        </Text>
                    </View>
                    <Kharkiv style={{position: 'absolute', right: 0, bottom: 0}}></Kharkiv>
                    <ClothingCompanyJP style={{position: 'absolute', left: '5%', bottom: '10%'}}></ClothingCompanyJP>
                    <Scull style={{position: 'absolute', top: '2%', left: '5%'}}></Scull>
                    <DecorJP style={{position: 'absolute', top: '3%', right: '5%'}}></DecorJP>
                    <Decor style={{position: 'absolute', right: '1%', top: '30%'}}>
                    </Decor>
                    <DecorBottom style={{position: 'absolute', bottom: '1%', alignSelf: 'center'}}></DecorBottom>
                </View>
            </View>
        )

}

const styles = StyleSheet.create({
    button: {
        height: '7%',
        width: '70%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#DB2525',
        top: '-5%'
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "VCR_OSD_MONO",
    },
    text: {
        flex: 2,
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "VCR_OSD_MONO",
        width: '85%'
    },
    headerText: {
        flex: 1,
        height: 100,
        color: "#FFFFFF",
        fontSize: 44,
        textAlign: "center",
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
        top: '10%'
    },
    loginText: {
        flex: 1, left: '50%', color: 'white', fontSize: 18, fontFamily: 'VCR_OSD_MONO'
    },
    input: {
        height: '6%',
        alignItems: "center",
        justifyContent: "center",
        marginVertical: '3%',
        backgroundColor:  "#1F1F1F",
        textAlign: 'center',
        fontFamily: 'VCR_OSD_MONO',
        fontSize: 20,
        color: 'white',
        width: '70%',
        top: '-15%'
    }
});