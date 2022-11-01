import LoginAndRegistration from "./logAndReg"
import Footer from "../footer"
import {View} from "react-native";
import React from "react";

export default function Authorization() {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 12.5}}>
                <LoginAndRegistration/>
            </View>
            <Footer/>
        </View>
    )
}