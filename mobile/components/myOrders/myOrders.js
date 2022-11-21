import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
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
            <View style={{flex: 11, alignItems: 'center'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{
                        bottom: '5%',
                        fontFamily: 'VCR_OSD_MONO',
                        fontSize: 36,
                        color: '#FFFFFF',
                        textAlign: 'center',
                    }}>
                        MY ORDERS
                    </Text>
                </View>
                <View style={{
                    flex: 0.8,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1
                    }}>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 18,
                            width: Dimensions.get("screen").width,
                            left: '10%'
                        }}>
                            №1461346
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '10%',
                            top: '10%'
                        }}>
                            1 446 UAH
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            color: '#59DE56',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '58%'
                        }}>
                            ВИДАНО
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '22%',
                            top: '10%'
                        }}>
                            1 oct. 2022 16:03:39
                        </Text>
                    </View>
                </View>
                <SafeAreaView style={{flex: 2}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={DATA1} renderItem={({item}) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image}></Image>
                        </View>
                    )} keyExtractor={item => item.id} numColumns='1'/>
                </SafeAreaView>
                <View style={{flex: 0.5}}/>
                <View style={{
                    flex: 0.8,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1
                    }}>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 18,
                            width: Dimensions.get("screen").width,
                            left: '10%'
                        }}>
                            №1461346
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '10%',
                            top: '10%'
                        }}>
                            1 446 UAH
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            color: '#DED056',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '56%'
                        }}>
                            У ДОРОЗІ
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '22%',
                            top: '10%'
                        }}>
                            1 oct. 2022 16:03:39
                        </Text>
                    </View>
                </View>
                <SafeAreaView style={{flex: 2}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={DATA1} renderItem={({item}) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image}></Image>
                        </View>
                    )} keyExtractor={item => item.id} numColumns='1'/>
                </SafeAreaView>
                <View style={{flex: 0.5}}/>
                <View style={{
                    flex: 0.8,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1
                    }}>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 18,
                            width: Dimensions.get("screen").width,
                            left: '10%'
                        }}>
                            №1461346
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '10%',
                            top: '10%'
                        }}>
                            1 446 UAH
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            color: '#DE5656',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '27%'
                        }}>
                            ОФОРМЛЮЄТЬСЯ
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'roboto-medium',
                            fontSize: 15,
                            width: Dimensions.get("screen").width,
                            left: '22%',
                            top: '10%'
                        }}>
                            1 oct. 2022 16:03:39
                        </Text>
                    </View>
                </View>
                <SafeAreaView style={{flex: 2, zIndex: 1}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={DATA1} renderItem={({item}) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image}></Image>
                        </View>
                    )} keyExtractor={item => item.id} numColumns='1'/>
                </SafeAreaView>
                <View style={{flex: 5}}>

                </View>
                <Scull style={{position: 'absolute', top: '1%', left: '5%', zIndex: 0}}></Scull>
                <DecorJP style={{position: 'absolute', top: '1%', right: '5%', zIndex: 0}}></DecorJP>
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