import React, {useState} from 'react';
import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {FilterButtonGroup} from "./FilterButtonGroup";
import {SizeButtonGroup} from "./SizeButtonGroup"
import FilterSlider from "./FilterSlider";
import Mark from "../../assets/images/login/xMark.svg"
import SafeAreaView, {SafeAreaProvider} from "react-native-safe-area-view";

const Filter = ({navigation}) => {

    const clothes = navigation.getParam('clothes')
    const [sort, setSort] = useState('Price Ascending')
    const [fromPrice, setFromPrice] = useState(0)
    const [toPrice, setToPrice] = useState(navigation.getParam('max'))
    const [sizes, setSizes] = useState(["xs", "s", "m", "l", "xl", "xxl", "un"])
    const sliderToFilter = (sliderFromPrice, sliderToPrice) => {
        setFromPrice(sliderFromPrice)
        setToPrice(sliderToPrice)
    }
    const sizeButtonsToFilter = (buttons) => {
        const res = []
        buttons.forEach(element => {
            res.push(element)
        })
        setSizes(res)
    }
    const root = navigation.getParam('root')
    const category = navigation.getParam('category')

    const sortToFilter = (button) => {
        setSort(button)
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 0.5, backgroundColor: '#323232'}}>
            </View>
            <View style={{
                flex: 1, backgroundColor: '#323232', justifyContent: 'space-between',
                alignItems: 'center', flexDirection: 'row',
            }}>
                <Pressable style={{left: '40%'}} onPress={() => navigation.goBack()}>
                    <Mark  />
                </Pressable>
                <Text style={{
                    paddingEnd: '45%',
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'roboto-regular',
                    color: 'white',
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
                <SafeAreaProvider>
                    <SafeAreaView>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <FilterButtonGroup buttons={['Price Ascending', 'Price Descending', 'Newest']} sortToFilter={sortToFilter}></FilterButtonGroup>
                        </ScrollView>
                    </SafeAreaView>
                </SafeAreaProvider>
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
                <FilterSlider sliderToFilter={sliderToFilter} to={toPrice}/>
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
                <SafeAreaProvider>
                    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                        <SizeButtonGroup buttons={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UN']}
                                         multiple={true} sizeButtonsToFilter={sizeButtonsToFilter}></SizeButtonGroup>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
            <View style={{flex: 4.725}}/>
            <View style={{flex: 0.7, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Pressable style={styles.accessButton} onPress={() => root===0 ? navigation.push("ItemsByCategory", {category: category, fromPrice: fromPrice, toPrice: toPrice, sizes: sizes, sort: sort}) : navigation.navigate("Search")}>
                        <Text style={styles.accessButtonText}>
                            Access
                        </Text>
                    </Pressable>
                </View>
                <View style={{flex: 1}}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.cancelButton}>
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
        flex: 1,
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