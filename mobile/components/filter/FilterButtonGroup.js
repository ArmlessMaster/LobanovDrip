import React, {useState} from "react";
import {StyleSheet, View, TouchableOpacity, Text, SafeAreaView, ScrollView, Pressable} from "react-native";

export const FilterButtonGroup = ({buttons, doSomethingAfterClick}) => {

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
                            index === clickedId ? styles.sortButtonActive : styles.sortButton
                        ]}>
                            <Text style={[
                                index === clickedId ? styles.sortButtonTextActive : styles.sortButtonText
                            ]}>{buttonLabel}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    sortButton: {
        borderColor: '#BABABA',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        marginHorizontal: 5,
        height: '100%',
    },
    sortButtonText: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 18,
        paddingHorizontal: 15
    },
    sortButtonActive: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: 'black',
        justifyContent: 'space-evenly',
        marginHorizontal: 5,
        height: '100%',
    },
    sortButtonTextActive: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 18,
        paddingHorizontal: 15,
        color: 'white'
    },
});