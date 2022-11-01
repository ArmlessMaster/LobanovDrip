import {Image, Pressable, StyleSheet, Text, View,  Button} from 'react-native';
import Store from "../assets/images/menu/StoreBtn.svg";
import Create from "../assets/images/menu/CreateBtn.svg";
import Menu from "../assets/images/menu/MenuBtn.svg";
import Cart from "../assets/images/menu/CartBtn.svg";
import Account from "../assets/images/menu/AccountBtn.svg";
import React from "react";

export default function Footer({ navigation }) {
    return(
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{flex: 5, flexDirection: 'row', justifyContent: 'space-around',
                alignItems: 'center', bottom: '2%'}}>
                <Store/>
                <Create/>
                <Menu/>
                <Cart/>
                <Pressable onPress={() => navigation.navigate('Registration')}>
                    <Account/>
                </Pressable>
            </View>
        </View>
    );
}