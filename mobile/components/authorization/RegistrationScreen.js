import {Alert, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useContext, useState} from 'react';
import ClothingCompanyJP from "../../assets/images/clothingCompanyJP.svg";
import Kharkiv from "../../assets/images/KHARKIV.svg";
import Scull from '../../assets/images/scull.svg';
import Christ from '../../assets/images/Christ.svg';
import Arrow from '../../assets/images/Arrow 4.svg';
import DecorJP from '../../assets/images/Decor Jpn.svg';
import Decor from '../../assets/images/Registration Decor Thing.svg';
import DecorBottom from '../../assets/images/Decor Thing.svg';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";


export default function Registration({navigation}) {

    const auth = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const registerHandler = async () => {
        try {
            if (password === repeatedPassword) {
                const response = await axios.post(
                    `https://lobanovdriptest.herokuapp.com/api/account/register`,
                    { email: `${email}`, password: `${password}`, name: `${name}`, surname: `${surname}` }
                );
                Alert.alert(
                    'Success',
                    'Registration completed successfully! Please, login in.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.push('Authorization')
                        },
                    ],
                    {cancelable: false},
                );
                console.log("Success")
            }
            else {
                Alert.alert("Wrong repeated password!")
            }
        } catch (e) {
            Alert.alert("Error! Unable to register account")
        }
    }

    function first() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.headerText}>IS THIS YOUR FIRST VISIT?</Text>
                <Pressable style={styles.button} onPress={() => setFirst(false)}>
                    <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
                </Pressable>
                <Text style={styles.text}>
                    <Text>
                        Read the
                    </Text>
                    <Text style={{textDecorationLine: 'underline'}}> Privacy Policy, Rules and Site Selection
                        Guidelines</Text>
                </Text>
            </View>
        )
    }

    function second() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL"
                    onChangeText={(value) => setEmail(value)}
                    placeholderTextColor='white'/>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="PASSWORD"
                    onChangeText={(value) => setPassword(value)}
                    placeholderTextColor='white'/>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="REPEAT PASSWORD"
                    onChangeText={(value) => setRepeatedPassword(value)}
                    placeholderTextColor='white'/>
                <TextInput
                    style={styles.input}
                    placeholder="NAME"
                    onChangeText={(value) => setName(value)}
                    placeholderTextColor='white'/>
                <TextInput
                    style={styles.input}
                    placeholder="SURNAME"
                    onChangeText={(value) => setSurname(value)}
                    placeholderTextColor='white'/>
                <Pressable style={styles.button} onPress={registerHandler}>
                    <Text style={styles.buttonText}>SIGN-IN</Text>
                </Pressable>
            </View>
        )
    }

    const [isFirst, setFirst] = useState(true)
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
                <Pressable style={{flex: 1}} onPress={() => navigation.navigate("SwipeStore")}>
                    <Christ style={{left: '6%'}}></Christ>
                </Pressable>
                <Pressable style={{flex: 1, flexDirection: 'row'}}>
                    <Arrow style={{flex: 1, left: '100%', top: '1%'}}></Arrow>
                    <Text style={styles.loginText}>LOGIN-IN</Text>
                </Pressable>
            </View>
            <View style={{flex: 11}}>
                <Kharkiv style={{position: 'absolute', right: 0, bottom: 0}}></Kharkiv>
                <ClothingCompanyJP style={{position: 'absolute', left: '5%', bottom: '10%'}}></ClothingCompanyJP>
                <Scull style={{position: 'absolute', top: '2%', left: '5%'}}></Scull>
                <DecorJP style={{position: 'absolute', top: '3%', right: '5%'}}></DecorJP>
                <Decor style={{position: 'absolute', right: '1%', top: '30%'}}>
                </Decor>
                <DecorBottom style={{position: 'absolute', bottom: '1%', alignSelf: 'center'}}></DecorBottom>
                {
                    isFirst ? (
                        first()
                    ) : second()
                }
            </View>
        </View>
    );

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
        flex: 1, left: '130%', color: 'white', fontSize: 18, fontFamily: 'VCR_OSD_MONO'
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