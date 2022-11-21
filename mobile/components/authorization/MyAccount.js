import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput, Alert,
} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import AdressIcon from '../../assets/images/Adress.svg'
import FullNameIcon from '../../assets/images/FullName.svg'
import PhoneIcon from '../../assets/images/Phone.svg'
import AccountLine from '../../assets/images/AccountLine.svg'
import NovaPoshta from '../../assets/images/NovaPoshta.svg'
import WhiteText from '../../assets/images/WhiteTextMyAccount.svg'
import BackgroundText from '../../assets/images/BackgroundTextMyAccount.svg'
import Footer from "../footer";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {has} from "react-native/Libraries/Blob/BlobRegistry";


export default function MyAccount({navigation}) {

    const auth = useContext(AuthContext)
    const { loading, request } = useHttp();
    const [info, setInfo] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);
    const fetchInfo = useCallback(async () => {
        try {
            const fetched = await request(
                "https://lobanovdriptest.herokuapp.com/api/account",
                "GET",
                null,
                null,
                {Authorization: `Bearer ` + `${auth.token}`}
            );
            setInfo(fetched.data)
            setHasLoaded(true)
        }
        catch (e) {console.log('error')}
    }, [request])

    useEffect(() => {
        fetchInfo()
    }, [fetchInfo])

    const logoutHandler = () => {
        Alert.alert(
            'Logout',
            'Are you sure want to logout?',
            [
                {
                    text: 'YES',
                    onPress: () => {auth.logout(); navigation.push("SwipeScreen")}
                },
                {
                    text: 'NO'
                },
            ],
            {cancelable: true},
        );

    }


    return hasLoaded ? (
        <View style={styles.screen}>
            <View style={{flex: 10.5}}>
                <View style={styles.header}/>
                <View style={styles.myAccount}>
                    <Text style={styles.textMyAccount}>MY ACCOUNT</Text>
                </View>
                <View style={styles.mainArea}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{justifyContent: 'space-around'
                        }}>
                            <View style={{flexDirection:'row', left:'20%'}}>
                                <FullNameIcon/>
                                <View style={{left:'40%'}}>
                                    <Text style={styles.textItem}>{info.name}</Text>
                                    <Text style={styles.textInfo}>{info.surname}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', left:'23%'}}>
                                <View style={{right: '10%'}}>
                                    <PhoneIcon/>
                                </View>
                                <View style={{left:'40%'}}>
                                    <Text style={styles.textItem}>PHONE NUMBER</Text>
                                    <Text style={styles.textInfo}>+38{info.phone != null ? info.phone : "NOT SPECIFIED"}</Text>
                                </View>

                            </View>
                            <View style={{flexDirection:'row', left:'20%'}}>
                                <NovaPoshta/>

                                <View style={{left:'40%'}}>
                                    <Text style={styles.textItem}>NOVAPOSHTA BRANCH</Text>
                                    <Text style={styles.textInfo}>{info.novaposhta != null ? info.novaposhta : "NOT SPECIFIED"}</Text>

                                </View>

                            </View>
                            <View style={{flexDirection:'row', left:'20%'}}>
                                <View style={{left: '3%'}}>
                                    <AdressIcon/>
                                </View>
                                <View style={{left:'40%'}}>
                                    <Text style={styles.textItem}>ADRESS</Text>
                                    <Text style={styles.textInfo}>{info.region != null ? (info.region + ", " + info.city) : "NOT SPECIFIED" + info.city}</Text>

                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1, alignItems: 'flex-end', paddingRight: '1%'}}>
                        <AccountLine/>
                    </View>

                </View>
                <View style={{flex:0.5, justifyContent:'center', alignItems:'center', paddingTop:'4%'}}>
                    <Pressable onPress={() => navigation.push('PersonalInfo', {info: info})}>
                        <Text style={styles.tapToChange}>TAP TO CHANGE</Text>
                    </Pressable>
                </View>

                <View style={styles.buttonsArea}>
                    <View style={{flex:0.1, justifyContent:'flex-end', paddingBottom: '5%', paddingLeft: '2%'}}>
                        <WhiteText/>

                    </View>
                    <View style={{flex: 10}}>
                        <View style={styles.blueBotton}>
                            <Pressable style={{backgroundColor:'#3124D0', width:'80%', height:'75%', justifyContent:'center', alignItems: 'center',     textShadowColor: "rgba(0, 0, 0, 0.75)",
                                textShadowOffset: { width: -1, height: 1 },
                                textShadowRadius: 40,
                            }} onPress={() => navigation.push("MyOrders")}>
                                <Text style={styles.textBotton}>MY ORDERS</Text>
                            </Pressable>
                        </View>

                        <View style={styles.blueBotton}>
                            <Pressable style={{backgroundColor:'#3124D0', width:'80%', height:'75%', justifyContent:'center', alignItems: 'center',     textShadowColor: "rgba(0, 0, 0, 0.75)",
                                textShadowOffset: { width: -1, height: 1 },
                                textShadowRadius: 40,
                            }} onPress={() => navigation.push("ChangePassword")}>
                                <Text style={styles.textBotton}>CHANGE PASSWORD</Text>
                            </Pressable>
                        </View>
                        <View style={styles.logOut}>
                            <Pressable style={{backgroundColor:'#323232', width:'80%', height:'37.5%', justifyContent:'center', alignItems: 'center',    textShadowColor: "rgba(0, 0, 0, 0.75)",
                                textShadowOffset: { width: -1, height: 1 },
                                textShadowRadius: 40,
                            }} onPress={logoutHandler}>
                                <Text style={styles.textBotton}>LOGOUT</Text>

                            </Pressable>

                        </View>

                    </View>
                    <View style={{ flex:0.1}}>
                        <BackgroundText/>
                    </View>
                </View>
            </View>

            <Footer navigation={navigation}/>


        </View>
    ) : <Text>Loading...</Text>
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        backgroundColor: '#0D0D0D'
    },
    header:{
        flex: 1.5,
    },
    myAccount:{
        flex: 2,
        alignItems : 'center',
        justifyContent: 'center',
    },
    textMyAccount:{
        color:'#fff',
        fontSize: 44,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},


    },
    mainArea:{
        flex: 4,
        flexDirection:'row',
        paddingTop:'15%'


    },
    textItem:{
        fontFamily:'roboto-regular',
        color:'#888888',

    },
    textInfo:{
        fontFamily:'roboto-regular',
        color:'#FFFFFF'
    },
    buttonsArea:{
        flex: 5,
        paddingTop:'25%',
        flexDirection:'row'
    },
    footer:{
        flex:1,
        backgroundColor:'black'
    },

    blueBotton:{
        flex: 1,
        alignItems:"center",
        justifyContent:'center',


    },
    logOut:{
        flex:2,
        alignItems:"center",
        justifyContent:'center'
    },

    textBotton:{
        color:'#fff',
        fontSize: 22,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
    },
    tapToChange:{
        color:'#609FFF',
        fontSize: 17,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
        textDecorationLine: "underline",
        textDecorationColor: '#609FFF',
        textDecorationStyle: 'solid',
    },



})
