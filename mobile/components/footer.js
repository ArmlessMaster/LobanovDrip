import { Pressable, View} from 'react-native';
import Store from "../assets/images/menu/StoreBtn.svg";
import Create from "../assets/images/menu/CreateBtn.svg";
import Menu from "../assets/images/menu/MenuBtn.svg";
import Cart from "../assets/images/menu/CartBtn.svg";
import Account from "../assets/images/menu/AccountBtn.svg";
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export default function Footer({ navigation}) {
    const auth = useContext(AuthContext)

    function clickedAccount() {
        if (auth.isAuthenticated) {
            navigation.navigate('ChangePassword')
        } else {
            navigation.navigate('Authorization')
        }
    }

    return(
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{flex: 5, flexDirection: 'row', justifyContent: 'space-around',
                alignItems: 'center', bottom: '2%'}}>
                <Pressable onPress={() => navigation.navigate('SwipeStore')}>
                    <Store/>
                </Pressable>
                <Pressable>
                    <Create/>
                </Pressable>
                <Pressable>
                    <Menu/>
                </Pressable>
                <Pressable>
                    <Cart/>
                </Pressable>
                <Pressable onPress={() => clickedAccount()}>
                    <Account/>
                </Pressable>
            </View>
        </View>
    );
}