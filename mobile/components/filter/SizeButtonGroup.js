import React, {useEffect, useState} from "react";
import {StyleSheet, View, TouchableOpacity, Text, Pressable, TextInput, Button} from "react-native";

export const SizeButtonGroup = ({buttons, available, multiple, sizeButtonsToRoot}) => {

    const [clickedId, setClickedId] =  multiple ? useState(buttons) : useState(0)
    const handleClick = (item, id) => {
        setClickedId(id)
    }

    const handleMultipleClick = (buttonLabel) => {
        if (clickedId.indexOf(buttonLabel) === -1) {
            setClickedId(clickedId => [...clickedId, buttonLabel]);
        } else {
            setClickedId(clickedId.filter(item => item !== buttonLabel))}
    }

    useEffect(() => {
        if(sizeButtonsToRoot !== null){
            sizeButtonsToRoot(buttons[clickedId])
        }
    }, [clickedId]);

    return !multiple ? (
        <View style={{flex: 1, flexDirection: 'row'}}>
            {
                buttons.map((buttonLabel, index) => {
                    return (
                        <TouchableOpacity disabled={available==null ? false : !available[index]} onPress={(item) => handleClick(item, index)} key={index} style={[
                            index === clickedId ? styles.sizeBoxActive : available==null || available[index] ? styles.sizeBox : styles.sizeBoxIsNotAvailable
                        ]}>
                            <Text style={[
                                index === clickedId ? styles.sizeBoxTextActive : available==null || available[index] ? styles.sizeBoxText : styles.sizeBoxTextIsNotAvailable
                            ]}>{buttonLabel}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    ) : (
        <View style={{flex: 1, flexDirection: 'row'}}>
            {
                buttons.map((buttonLabel, index) => {
                    return (
                        <TouchableOpacity onPress={() => handleMultipleClick(buttonLabel)} key={index} style={[
                            clickedId.indexOf(buttonLabel) !== -1 ? styles.sizeBoxActive : styles.sizeBox
                        ]}>
                            <Text style={[
                                clickedId.indexOf(buttonLabel) !== -1 ? styles.sizeBoxTextActive :  styles.sizeBoxText
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
        marginHorizontal: '2%',
    },
    sizeBoxText: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 16,
        color: 'black'
    },
    sizeBoxActive: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%',
        backgroundColor: 'black',
    },
    sizeBoxTextActive: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 18,
        color: 'white'
    },
    sizeBoxIsNotAvailable: {
        borderColor: '#C1B9B9',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%'
    },
    sizeBoxTextIsNotAvailable: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 16,
        color: '#C1B9B9'
    },
})