import React, {useEffect, useCallback, useState} from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable, SafeAreaView, ScrollView} from 'react-native';
import Navigation from "../../navigation/navigation";
import Slider from "@react-native-community/slider";
import Line from "../../assets/images/filter/Line.svg"
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { FilterButtonGroup } from "./FilterButtonGroup";
import { SizeButtonGroup} from "./SizeButtonGroup"
import FilterSlider from "./FilterSlider";
import CustomMarker from "./customMarker";

const Filter = () => {
    let minValue = 0;
    let maxValue = 890;
    const [currValue, setSliderValue] = useState(0)
    const printButtonLabel = (item) =>{
        console.log(item)
    }
    const [sliderOneChanging, setSliderOneChanging] = React.useState(false);
    const [sliderOneValue, setSliderOneValue] = React.useState([5]);
    const [multiSliderValue, setMultiSliderValue] = React.useState([3, 7]);
    const [
        nonCollidingMultiSliderValue,
        setNonCollidingMultiSliderValue,
    ] = React.useState([0, 100]);
    return (
        <View style={styles.container}>
            <View style={{flex: 0.5}}/>
            <View style={{flex: 1}}/>
            <View style={styles.sortBy}>
                <Text style={styles.text}>
                    SORT BY
                </Text>
            </View>
            <View style={{flex: 0.25}}/>
            <View style={{flex: 0.5}}>
                <SafeAreaView>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <FilterButtonGroup buttons={['Low-High price', 'High-Low price', 'From A to B', 'From B to A',
                            'Newest']} doSomethingAfterClick={printButtonLabel}></FilterButtonGroup>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <View style={{flex: 0.5, alignItems: 'center'}}>
                <View style={{borderBottomColor: '#BCBCBC',
                    borderBottomWidth: 0.75, top: '50%', width: '90%'}}>
                </View>
            </View>
            <View style={styles.price}>
                <Text style={styles.text}>
                    PRICE
                </Text>
            </View>
            <View style={{flex: 0.75, alignItems: 'center'}}>
                {/*<Slider*/}
                {/*    style={{width: '90%', left: '5%', bottom: '8%'}}*/}
                {/*    minimumValue={minValue}*/}
                {/*    maximumValue={maxValue}*/}
                {/*    onSlidingStart={minValue}*/}
                {/*    onValueChange={(value) => setSliderValue(value)}*/}
                {/*    step={10}*/}
                {/*    minimumTrackTintColor="black"*/}
                {/*    maximumTrackTintColor='#8D8D8D'*/}
                {/*    thumbTintColor='black'*/}
                {/*/>*/}
            </View>
            <View style={{flex: 0.5, flexDirection:'column', bottom: '5%'}}>
                <FilterSlider/>
                <View style={{flex: 0.5}}>
                </View>
            </View>
            <View style={{flex: 0.5, alignItems: 'center'}}>
                <View style={{borderBottomColor: '#BCBCBC',
                    borderBottomWidth: 1, top: '30%', width: '90%'}}>
                </View>
            </View>
            <View style={{flex: 0.5, alignItems: 'center'}}>
                <Text style={styles.text}>
                    SIZE
                </Text>
            </View>
            <View style={{flex: 0.25}}>

            </View>
            <View style={{flex: 0.5}}>
                <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                    <SizeButtonGroup buttons={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                                     doSomethingAfterClick={printButtonLabel}></SizeButtonGroup>
                </SafeAreaView>
            </View>
            <View style={{flex: 5.725}}/>
            <View style={{flex: 0.7, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Pressable style={styles.accessButton}>
                        <Text style={styles.accessButtonText}>
                            Access
                        </Text>
                    </Pressable>
                </View>
                <View style={{flex: 1}}>
                    <Pressable style={styles.cancelButton}>
                        <Text style={styles.sortButtonText}>
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={{flex: 0.5}}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: {
        flex: 11,
        justifyContent: 'center'
    },
    horizontalSlider: {

    },
    sortBy: {
        flex: 0.5,
        alignItems: 'center',
    },
    price: {
        flex: 0.5,
        alignItems: "center"
    },
    minValue: {
        flex: 1,
        width: '10%',
        height: '75%',
        backgroundColor: '#D4D4D4',
    },
    maxValue: {
        flex: 1,
        width: '10%',
        height: '75%',
        backgroundColor: '#D4D4D4',
    },
    currentValue: {
        flex: 2,
        width: '10%',
        height: '75%',
        backgroundColor: '#D4D4D4',
    },
    minAndMaxValueText: {
        fontFamily: 'inter-medium',
        fontSize: 18,
        textAlign: 'right',
    },
    currentValueText: {
        fontFamily: 'inter-medium',
        fontSize: 18,
        textAlign: 'center',
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
        fontSize: 18,
    },
    text: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 25,
    },
    accessButtonText: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 18,
        paddingHorizontal: 15,
        color: 'white'
    },
    accessButton: {
        borderColor: '#BABABA',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: 'black',
        justifyContent: 'space-evenly',
        marginHorizontal: 5,
        height: '100%',
        width: '80%',
        left: '8%',
        alignItems: 'center',
    },
    cancelButton : {
        borderColor: '#BABABA',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        marginHorizontal: 5,
        height: '100%',
        width: '80%',
        left: '8%',
        alignItems: 'center',
        color: 'black'
    }
});

export default Filter