import React, {useState} from "react";
import {StyleSheet, View, TouchableOpacity, Text, SafeAreaView, ScrollView, Pressable} from "react-native";

export const SizeButtonGroup = ({buttons, doSomethingAfterClick}) => {

    const [clickedId, setClickedId] = useState(0)
    const handleClick = (item, id) => {
        setClickedId(id)
        doSomethingAfterClick(item)
    }

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            {
                buttons.map((buttonLabel, index) => {
                    return (
                        <TouchableOpacity onPress={(item) => handleClick(item, index)} key={index} style={[
                            index === clickedId ? styles.sizeBoxActive : styles.sizeBox
                        ]}>
                            <Text style={[
                                index === clickedId ? styles.sizeBoxTextActive : styles.sizeBoxText
                            ]}>{buttonLabel}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    sizeBox: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%'
    },
    sizeBoxText: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 16,
    },
    sizeBoxActive: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%',
        backgroundColor: 'black'
    },
    sizeBoxTextActive: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 18,
        color: 'white'
    },
})