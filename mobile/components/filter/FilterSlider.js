import React, { useState } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CustomMarker from './customMarker';
import {Dimensions, StyleSheet, Text, View} from "react-native";



const Slider = ({sliderToFilter, to}) => {

    const [multiSliderValue, setMultiSliderValue] = useState([0, to])

    const multiSliderValuesChange = (values) => {
        setMultiSliderValue(values)
        sliderToFilter(values[0], values[1])
    }

    return (
        <View style={styles.viewContainer}>
            <View style={styles.sliderWrapper}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.labelText}>{multiSliderValue[0]} </Text>
                    <Text style={styles.labelText}>{multiSliderValue[1]}</Text>
                </View>
                <MultiSlider
                    selectedStyle={{
                        backgroundColor: 'black',
                        height: 3
                    }}
                    trackStyle={{
                        backgroundColor: '#8D8D8D',
                        height: 3
                    }}
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={Dimensions.get("screen").width/100*85}
                    onValuesChange={multiSliderValuesChange}
                    min={0}
                    max={to}
                    step={1}
                    customMarker={CustomMarker}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sliderWrapper: {
        justifyContent: 'center'
    },
    viewContainer: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    labelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: -8,
        marginRight: -10,
        top: '18%',
        left: '1%',
    },
    labelText: {
        fontSize: 20
    }}
)

export default Slider