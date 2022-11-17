import * as React from 'react';
import {
    StyleSheet, View, Text, FlatList, Image, SafeAreaView, Dimensions, ScrollView
} from 'react-native';
import SecondHeader from "./SecondHeader";
export default function StoreScreen({navigation}) {

    return(
        <View  style={{flex:1}}>
            <View style={{flex:10.5}}>
                <SecondHeader navigation={navigation}/>

            </View>
        </View>
    )
}

