import React from 'react';
import {Text, View, StyleSheet, Pressable, SafeAreaView, ScrollView} from 'react-native';
import {FilterButtonGroup} from "./FilterButtonGroup";
import {SizeButtonGroup} from "./SizeButtonGroup"
import FilterSlider from "./FilterSlider";
import Mark from "../../assets/images/login/xMark.svg"

const Filter = ({ navigation }) => {
    const printButtonLabel = (item) => {
        console.log(item)
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#323232', flex: 0.5}}></View>
            <View style={{
                flex: 1, backgroundColor: '#323232', justifyContent: 'center',
                alignItems: 'center', flexDirection: 'row',
            }}>
                <Pressable style={{left: '20%'}}>
                    <Mark />
                </Pressable>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'roboto-regular',
                    color: 'white',
                    right: '20%'
                }}>
                    FILTER
                </Text>
            </View>
            <View style={{flex:1}}/>
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
                <View style={{
                    borderBottomColor: '#BCBCBC',
                    borderBottomWidth: 0.75, top: '50%', width: '90%'
                }}>
                </View>
            </View>
            <View style={styles.price}>
                <Text style={styles.text}>
                    PRICE
                </Text>
            </View>
            <View style={{flex: 0.75, alignItems: 'center'}}/>
            <View style={{flex: 0.5, flexDirection: 'column', bottom: '5%'}}>
                <FilterSlider/>
                <View style={{flex: 0.5}}/>
            </View>
            <View style={{flex: 0.5, alignItems: 'center'}}>
                <View style={{
                    borderBottomColor: '#BCBCBC',
                    borderBottomWidth: 1, top: '30%', width: '90%'
                }}>
                </View>
            </View>
            <View style={{flex: 0.5, alignItems: 'center'}}>
                <Text style={styles.text}>
                    SIZE
                </Text>
            </View>
            <View style={{flex: 0.25}}/>
            <View style={{flex: 0.5}}>
                <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                    <SizeButtonGroup buttons={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                                     doSomethingAfterClick={printButtonLabel}></SizeButtonGroup>
                </SafeAreaView>
            </View>
            <View style={{flex: 4.725}}/>
            <View style={{flex: 0.7, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Pressable style={styles.accessButton}>
                        <Text style={styles.accessButtonText}>
                            Access
                        </Text>
                    </Pressable>
                </View>
                <View style={{flex: 1}}>
                    <Pressable onPress={() => this._panel.hide()} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={{flex: 0.5}}/>
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
    sortBy: {
        flex: 0.5,
        alignItems: 'center',
    },
    price: {
        flex: 0.5,
        alignItems: "center"
    },
    cancelButtonText: {
        fontFamily: 'roboto-regular',
        fontStyle: 'normal',
        fontSize: 18,
        paddingHorizontal: 15
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
    cancelButton: {
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
        color: 'black',
    }
});

export default Filter