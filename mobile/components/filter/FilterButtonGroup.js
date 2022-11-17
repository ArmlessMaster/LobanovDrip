import React, {useEffect, useState} from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";

export const FilterButtonGroup = ({buttons, sortToFilter}) => {

    const [clickedId, setClickedId] = useState(buttons[0])
    const handleClick = (buttonLabel) => {
        setClickedId(buttonLabel)
    }

    useEffect(() => {
        sortToFilter(clickedId)
    }, [clickedId])

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            {
                buttons.map((buttonLabel, index) => {
                    return (
                        <TouchableOpacity onPress={() => handleClick(buttonLabel)} key={index} style={[
                            buttonLabel === clickedId ? styles.sortButtonActive : styles.sortButton
                        ]}>
                            <Text style={[
                                buttonLabel === clickedId ? styles.sortButtonTextActive : styles.sortButtonText
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