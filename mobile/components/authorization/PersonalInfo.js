import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput, ScrollView, Alert,
} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import WhiteText from '../../assets/images/WhiteTextMyAccount.svg'
import Scull from '../../assets/images/scull.svg'
import HeaderText from '../../assets/images/SmallText.svg'
import Arrow from '../../assets/images/ArrowLeft.svg'
import Footer from "../footer";
import {AuthContext} from "../../context/AuthContext";

export default function PersonalInfo({navigation}) {

    const info = navigation.getParam('info')
    const auth = useContext(AuthContext)
    const [name, setName] = useState(info.name)
    const [surname, setSurname] = useState(info.surname)
    const [patronymic, setPatronymic] = useState(info.patronymic)
    const [phone, setPhone] = useState("+38" + (info.phone != null ? info.phone : ""))
    const [email, setEmail] = useState(info.email)
    const [city, setCity] = useState(info.city)
    const [region, setRegion] = useState(info.region)
    const [novaposhta, setNovaposhta] = useState(info.novaposhta)
    const changeInfoHandler = async () => {
        try {
            const method = "PUT";
            let body = {
                _id: getId(auth.token),
                email: email,
                name: name,
                surname: surname,
                patronymic: patronymic,
                phone: (phone.startsWith("+38") ? phone.slice(3) : phone)
            };
            body = JSON.stringify(body);
            const headers = {Authorization: `Bearer ` + `${auth.token}`};
            headers["Content-Type"] = "application/json";
            const response1 = await fetch(`https://lobanovdriptest.herokuapp.com/api/account/update`, {
                method,
                body,
                headers,
            });
            console.log(response1.json())
            Alert.alert(
                'Success',
                'Info was successfully changed!',
                [
                    {
                        text: 'OK'
                    },
                ],
                {cancelable: false},
            );
        } catch (e) {
            console.log("Info was not changed. Error!")
        }
    }

    const changeDeliveryInfo = async () => {
        try {
            const method = "PUT";
            let body = {_id: getId(auth.token), region: region, city: city, novaposhta: novaposhta};
            body = JSON.stringify(body);
            const headers = {Authorization: `Bearer ` + `${auth.token}`};
            headers["Content-Type"] = "application/json";
            const response1 = await fetch(`https://lobanovdriptest.herokuapp.com/api/account/update`, {
                method,
                body,
                headers,
            });
            Alert.alert(
                'Success',
                'Info was successfully changed!',
                [
                    {
                        text: 'OK'
                    },
                ],
                {cancelable: false},
            );
        } catch (e) {
            console.log("Info was not changed. Error!")
        }
    }

    function getId(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload).id;
    }

    return (
        <View style={{flex: 1}}>

            <View style={{flex: 10.5}}>
                <View style={{flex: 0.5, backgroundColor: '#000'}}/>
                <View style={styles.header}>
                    <Pressable style={{flexDirection: 'row', right: '5%', top: '10%'}} onPress={() => navigation.push('MyAccount')}>
                        <Arrow style={{right: '30%'}}/>
                        <Text style={{
                            color: '#fff',
                            fontFamily: "VCR_OSD_MONO",
                            fontSize: 20,
                            bottom: '5%',
                            right: '10%'
                        }}>BACK</Text>

                    </Pressable>
                </View>
                <View style={styles.main}>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.mainHeader}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                paddingLeft: '3%',
                                paddingTop: '2%'
                            }}><Scull/></View>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                paddingTop: '2%',
                                paddingRight: '3%'
                            }}><HeaderText/></View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '5%'}}>
                            <Text style={styles.headerText}>PERSONAL INFO</Text>
                        </View>
                        <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', paddingTop: '4%'}}>
                            <Text style={styles.tapToChange}>TAP TO CHANGE</Text>
                        </View>
                        <Text style={styles.textInfo}>NAME</Text>
                        <View style={styles.greyBotton}>
                            <TextInput
                                style={[styles.greyBottonText, {
                                    backgroundColor: '#1F1F1F',
                                    width: '70%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor='white'/>
                        </View>
                        <Text style={styles.textInfo}>SURNAME</Text>
                        <View style={styles.greyBotton}>
                            <TextInput
                                style={[styles.greyBottonText, {
                                    backgroundColor: '#1F1F1F',
                                    width: '70%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}
                                onChangeText={setSurname}
                                value={surname}
                                placeholderTextColor='white'/>
                        </View>
                        <Text style={styles.textInfo}>PATRONYMIC</Text>
                        <View style={styles.greyBotton}>
                            <TextInput
                                style={[styles.greyBottonText, {
                                    backgroundColor: '#1F1F1F',
                                    width: '70%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}
                                value={patronymic}
                                onChangeText={setPatronymic}
                                placeholderTextColor='white'/>
                        </View>
                        <Text style={styles.textInfo}>PHONE</Text>
                        <View style={styles.greyBotton}>
                            <TextInput
                                style={[styles.greyBottonText, {
                                    backgroundColor: '#1F1F1F',
                                    width: '70%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}
                                value={phone}
                                onChangeText={setPhone}

                                placeholderTextColor='white'/>
                        </View>
                        <Text style={styles.textInfo}>EMAIL</Text>
                        <View style={styles.greyBotton}>
                            <TextInput
                                style={[styles.greyBottonText, {
                                    backgroundColor: '#1F1F1F',
                                    width: '70%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor='white'/>
                        </View>
                        <View style={styles.redBotton}>
                            <Pressable onPress={changeInfoHandler} style={{
                                backgroundColor: '#DB2525',
                                width: '50%',
                                height: '200%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={styles.greyBottonText}>CHANGE</Text>
                            </Pressable>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.headerText}>DELIVERY ADRESS</Text>
                        </View>
                        <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', paddingTop: '4%'}}>
                            <Text style={styles.tapToChange}>TAP TO CHANGE</Text>
                        </View>

                        <Text style={styles.textInfo}>REGION</Text>
                        <View style={styles.greyBotton}>
                            <TextInput
                                style={[styles.greyBottonText, {
                                    backgroundColor: '#1F1F1F',
                                    width: '70%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}
                                value={region}
                                onChangeText={setRegion}
                                placeholderTextColor='white'/>
                        </View>
                        <Text style={styles.textInfo}>CITY / VILLAGE</Text>
                        <View style={styles.greyBotton}>
                            <TextInput
                                style={[styles.greyBottonText, {
                                    backgroundColor: '#1F1F1F',
                                    width: '70%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}
                                value={city}
                                onChangeText={setCity}
                                placeholderTextColor='white'/>
                        </View>
                        <Text style={styles.textInfo}>NOVAPOSHTA DEPART</Text>
                        <View style={styles.greyBotton}>
                            <TextInput
                                style={[styles.greyBottonText, {
                                    backgroundColor: '#1F1F1F',
                                    width: '70%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}
                                value={novaposhta}
                                onChangeText={setNovaposhta}
                                keyboardType={'numeric'}
                                placeholderTextColor='white'/>
                        </View>
                        <View style={{flexDirection: 'row', flex: 10}}>
                            <View style={{
                                flex: 0.1,
                                justifyContent: 'flex-start',
                                paddingBottom: '5%',
                                paddingLeft: '2%'
                            }}>
                                <WhiteText/>
                            </View>
                            <View style={styles.redBotton2}>
                                <Pressable onPress={changeDeliveryInfo} style={{
                                    backgroundColor: '#DB2525',
                                    width: '65%',
                                    height: '200%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={styles.greyBottonText}>CHANGE</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>

            <Footer navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    main: {
        flex: 11,
        backgroundColor: '#0D0D0D'
    },

    mainHeader: {
        flexDirection: 'row',
        flex: 1,

    },
    bigText: {
        flex: 1, justifyContent: 'center', alignItems: ' center'
    },
    headerText: {
        color: '#fff',
        fontSize: 40,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},


    },
    tapToChange: {
        color: '#609FFF',
        fontSize: 17,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},


    },
    greyBotton: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: '3%'

    },
    redBotton: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: '15%',
        paddingBottom: '20%'
    },
    redBotton2: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: '15%',
        paddingBottom: '20%',
        paddingRight: '10%'
    },
    greyBottonText: {
        color: '#fff',
        fontSize: 22,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
        textAlign: "center"
    },
    textInfo: {
        fontFamily: 'roboto-regular',
        paddingTop: '5%',
        color: '#585858',
        paddingLeft: '15%',
    },

})
