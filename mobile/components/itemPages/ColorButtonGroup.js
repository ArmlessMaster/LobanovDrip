import React, {useEffect, useState} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";

export const ColorButtonGroup = ({buttons, doSomethingAfterClick, colorButtonToRoot}) => {

    const [clickedId, setClickedId] = useState(0)
    const handleClick = (item, id) => {
        setClickedId(id)
        doSomethingAfterClick(item)
    }

    useEffect(() => {
        if(colorButtonToRoot !== null){
            colorButtonToRoot(buttons[clickedId])
        }
    }, [clickedId]);

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {
                buttons.map((buttonColor, index) => {
                    return (
                        <TouchableOpacity onPress={(item) => handleClick(item, index)} key={index} style={[
                            index === clickedId ? [styles.colorButtonActive, {backgroundColor: `${buttonColor}`}] : [styles.colorButton, {backgroundColor: `${buttonColor}`}]
                        ]}>
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
    colorButton: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        marginLeft: '2%'
    },
    colorButtonActive: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: '#919191',
        marginLeft: '2%'

    }
});