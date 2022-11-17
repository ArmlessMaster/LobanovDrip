import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Constants from "expo-constants";
import Scull from "../../assets/images/scull.svg";

const HEIGHT_HEADER = Constants.statusBarHeight *3;



export default function FirstHeader(){

    return(
        <ScrollView
        >
            <View style={{backgroundColor:'#000', height:HEIGHT_HEADER,flex:1, flexDirection:'row'}}>
                <Scull style={{flex:1, position: 'absolute', top: '30%', left: '5%'}}></Scull>
                <View style={styles.lobanovdripBox}>
                    <Text style={styles.text}>LOBANOVDRIP</Text>

                </View>
                <Scull style={{flex: 1,position: 'absolute', top: '30%', left: '90%'}}></Scull>

            </View>
        </ScrollView>
    )
}

const styles = new StyleSheet.create({
    text:{
        color:'#fff',
        fontSize: 18,
        justifyContent:'center'
    },
    lobanovdripBox:{
        flex:1,
        alignItems:'center',
        bottom:'2%',
        justifyContent:'center'

    }
})




