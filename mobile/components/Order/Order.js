import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View
} from "react-native";
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
import Constants from "expo-constants";


export default function MyOrders() {

    const DATA1 = [
        {
            image: require('../../assets/images/lobanovDripProducts/1.jpg'),
            id: 1,
        },
        {
            image: require('../../assets/images/lobanovDripProducts/2.png'),
            id: 2,
        },
        {
            image: require('../../assets/images/lobanovDripProducts/3.png'),
            id: 3,
        },
        {
            image: require('../../assets/images/lobanovDripProducts/4.jpg'),
            id: 4,
        },
        {
            image: require('../../assets/images/lobanovDripProducts/5.jpg'),
            id: 5,
        },
        {
            image: require('../../assets/images/lobanovDripProducts/6.jpg'),
            id: 6,
        },
        {
            image: require('../../assets/images/lobanovDripProducts/7.jpg'),
            id: 7,
        },
        {
            image: require('../../assets/images/lobanovDripProducts/8.jpg'),
            id: 8,
        },
    ];

    return (
        <View style={{flex: 1, backgroundColor: '#0D0D0D'}}>
            <View style={{height: Constants.statusBarHeight, backgroundColor: 'black'}}/>
            <View style={{
                flex: 1,
                backgroundColor: 'black',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Pressable style={{flex: 1}}>
                    <Christ style={{left: '6%'}}></Christ>
                </Pressable>
                <Pressable style={{flex: 1, flexDirection: 'row'}}>
                    <Arrow style={{flex: 1, left: '170%', top: '1%'}}></Arrow>
                    <Text style={styles.loginText}>BACK</Text>
                </Pressable>
            </View>
            <View style={{flex: 11}}>
                <View style={{flex: 0.3}}>

                </View>
                <View style={{flex: 0.5}}>
                    <Text style={{
                        fontSize: 30,
                        fontFamily: 'VCR_OSD_MONO',
                        color: 'white',
                        left: '10%'
                    }}>
                        YOUR ORDER
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'roboto-medium',
                        color: 'white',
                        left: '10%'
                    }}>
                        ORDER ID: 22813371488
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        fontFamily: 'roboto-medium',
                        color: 'white',
                        left: '10%'
                    }}>
                        DELIVERY: 10₴
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'roboto-medium',
                        color: 'white',
                        left: '10%'
                    }}>
                        CLOTHES PRICE: 398₴
                    </Text>
                </View>
                <View style={{flex: 6}}>
                    <View style={{flex: 1}}>
                        <Text style={{
                            fontSize: 30,
                            fontFamily: 'VCR_OSD_MONO',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            ORDER INFO
                        </Text>
                        <TouchableOpacity style={{
                            top: '10%'
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontFamily: 'VCR_OSD_MONO',
                                color: '#609FFF',
                                textAlign: 'center',
                            }}>
                                TAP TO CHANGE
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput style={{
                            width: '70%',
                            backgroundColor: '#1F1F1F',
                            height: 48,
                            left: '15%'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'VCR_OSD_MONO',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                NAME
                            </Text>
                        </TextInput>
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput style={{
                            width: '70%',
                            backgroundColor: '#1F1F1F',
                            height: 48,
                            left: '15%'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'VCR_OSD_MONO',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                SURNAME
                            </Text>
                        </TextInput>
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput style={{
                            width: '70%',
                            backgroundColor: '#1F1F1F',
                            height: 48,
                            left: '15%'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'VCR_OSD_MONO',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                PATRONYMIC
                            </Text>
                        </TextInput>
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput style={{
                            width: '70%',
                            backgroundColor: '#1F1F1F',
                            height: 48,
                            left: '15%'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'VCR_OSD_MONO',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                REGION
                            </Text>
                        </TextInput>
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput style={{
                            width: '70%',
                            backgroundColor: '#1F1F1F',
                            height: 48,
                            left: '15%'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'VCR_OSD_MONO',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                CITY/VILLAGE
                            </Text>
                        </TextInput>
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput style={{
                            width: '70%',
                            backgroundColor: '#1F1F1F',
                            height: 48,
                            left: '15%'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'VCR_OSD_MONO',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                NOVAPOSHTA DEPART
                            </Text>
                        </TextInput>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'VCR_OSD_MONO',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            STAGE 1 OF 2
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={{
                        backgroundColor: '#DB2525',
                        width: '80%',
                        height: '50%',
                        left: '10%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'VCR_OSD_MONO',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            PAYMENT METHODS
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    loginText: {
        flex: 1, left: '180%', color: 'white', fontSize: 18, fontFamily: 'VCR_OSD_MONO'
    },
    item: {
        marginHorizontal: 25,
        marginVertical: 10,
        marginRight: 5
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'inter-regular',
        maxWidth: Dimensions.get('screen').width / 2.5
    },
    image: {
        width: Dimensions.get('screen').width / 4,
        height: Dimensions.get('screen').width / 4.5,
    }
});