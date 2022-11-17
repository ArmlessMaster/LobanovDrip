import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import React, {useCallback, useEffect, useState} from 'react';
import Arrow from "../assets/images/rightArrow.svg";
import SafeAreaView, {SafeAreaProvider} from 'react-native-safe-area-view';
import Footer from "./footer";
import {useHttp} from "../hooks/http.hook";
import ItemPage from "./itemPages/ItemPage"
import axios from "axios";

export default function Collections({}) {

    return  (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 12.5}}>
                <View style={{backgroundColor: '#323232', flex: 0.5}}></View>
                <View style={{
                    flex: 1, backgroundColor: '#323232', justifyContent: 'flex-end',
                    alignItems: 'center', flexDirection: 'row'
                }}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontFamily: 'roboto-medium', fontSize: 20}}>Collection name</Text>
                    </View>
                    <Pressable style={{right: '30%', top: '0.5%'}}><Arrow/></Pressable>
                </View>
                <View style={{flex: 10, backgroundColor: 'white'}}>

                </View>
            </View>
            <Footer style={{flex: 1}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontFamily: 'roboto-regular',
        fontSize: 18,
        color: 'white'
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'roboto-regular',
        color: 'white',
        left: '70%'
    },
    filter: {
        height: '70%',
        flex: 0.25,
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#BABABA',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        left: '30%',
        top: '3%'
    },
    item: {
        marginHorizontal: 25,
        marginVertical: 10,
        marginRight: 5,
        maxWidth: Dimensions.get('screen').width / 2.5
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'inter-regular',
        fontWeight: '600',
    },
    sizeText: {
        fontSize: 10,
        fontFamily: 'inter-regular',
        fontWeight: '300',
        color: '#737373',
    },
    image: {
        width: Dimensions.get('screen').width / 2.5,
        height: Dimensions.get('screen').width / 3, marginBottom: 10
    }
})