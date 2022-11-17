import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import React, {useCallback, useEffect, useState} from 'react';
import Arrow from "../../assets/images/rightArrow.svg";
import SafeAreaView, {SafeAreaProvider} from 'react-native-safe-area-view';
import Filter from "../filter/Filter"
import Footer from "../footer";
import {useHttp} from "../../hooks/http.hook";
import ItemPage from "../itemPages/ItemPage"
import axios from "axios";

export default function ItemsByCategory({navigation}) {

    const [hasLoaded, setHasLoaded] = useState(false)
    const sortBy = navigation.getParam('sort') != null ? navigation.getParam('sort') : 'Price Ascending'
    const { loading, request } = useHttp();
    const fromPrice = navigation.getParam('fromPrice') != null ? navigation.getParam('fromPrice') : 0
    const [toPrice, setToPrice] = useState(navigation.getParam('toPrice'))
    const sizes = navigation.getParam('sizes') != null ? navigation.getParam('sizes') : ["XS", "S", "M", "L", "XL", "XXL", "UN"]
    const [clothes, setClothes] = useState([]);
    const category = navigation.getParam('category')

    const fetchClothes = useCallback(async () => {
        try {
            const resp = await axios.get(`https://lobanovdriptest.herokuapp.com/api/clothes/find?type=${category}`)
            if (resp.data !== null) {
                const max = Math.max.apply(null, resp.data.clothes.map(function(item) {return item.price})) + 1
                await request(
                    "https://lobanovdriptest.herokuapp.com/api/clothes/filter?" +
                    new URLSearchParams({
                        type: category,
                        from_price: fromPrice,
                        to_price: toPrice === undefined ? max : toPrice,
                        size: sizes
                    })
                ).then((res) => {
                    clothes !== null ? setClothes(res.clothes) : setClothes([])
                    setToPrice(toPrice === undefined ? max : toPrice)
                });
            }
            setHasLoaded(true)
        }
        catch (e) {}
    }, [request])

    useEffect(() => {
        fetchClothes()
    }, [fetchClothes])

    useEffect(() => {
        if(sortBy==='Price Ascending') {
            setClothes(clothes.sort(function(a, b) {return a.price - b.price}))
        } else if (sortBy==='Price Descending') {
            setClothes(clothes.sort(function(a, b) {return b.price - a.price}))
        } else {
            setClothes(clothes.sort(function(a, b) {return a.createdAt - b.createdAt}))
        }
    }, [clothes])

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 10.5}}>
                <View style={{backgroundColor: '#323232', flex: 0.5}}></View>
                <View style={{
                    flex: 1, backgroundColor: '#323232', justifyContent: 'flex-end',
                    alignItems: 'center', flexDirection: 'row'
                }}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontFamily: 'roboto-medium', fontSize: 20}}>{category}</Text>
                    </View>
                    <Pressable style={{right: '30%', top: '0.5%'}} onPress={() => navigation.navigate("SwipeStore")}><Arrow/></Pressable>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Pressable onPress={() => navigation.navigate("Filter", {root: 0, category: category, max: toPrice})} style={styles.filter}>
                        <Text style={{fontSize: 18, fontFamily: 'roboto-regular'}}>Filter</Text>
                    </Pressable>
                </View>
                <SafeAreaProvider style={{flex: 9}}>
                    <SafeAreaView>
                        <FlatList data={clothes} renderItem={({item, index}) => (
                            <Pressable key={index} style={styles.item} onPress={() =>{navigation.navigate('ItemPage', {itemId: item._id, root: 'ItemsByCategory'})}}>
                                <Image source={{uri: item.imagesUrls[0]}} style={styles.image}></Image>
                                <Text styles={styles.itemText}>{`${item.name}`}</Text>
                                <View style={{flexDirection:'row'}}>
                                    {item.clothesCount.map((size, index) => {
                                        return(<Text style={styles.sizeText} key={index}>{`${size.size.toUpperCase() + " "}`}</Text>)
                                    })}
                                </View>
                                <Text style={styles.itemText}>{`${item.price}` + '₴'}</Text>
                            </Pressable>
                        )} keyExtractor={item => item._id} numColumns='2'/>
                    </SafeAreaView>
                </SafeAreaProvider>
            </View>
            <Footer navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontFamily: 'roboto-regular',
        fontSize: 18,
        color: 'white'
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'roboto-regular',
        color: 'white',
        left: '70%'
    },
    filter: {
        height: '70%',
        flex: 0.25,
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#BABABA',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        left: '30%',
        top: '3%'
    },
    item: {
        marginHorizontal: 25,
        marginVertical: 10,
        marginRight: 5,
        maxWidth: Dimensions.get('screen').width / 2.5
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'inter-regular',
        fontWeight: '600',
    },
    sizeText: {
        fontSize: 10,
        fontFamily: 'inter-regular',
        fontWeight: '300',
        color: '#737373',
    },
    image: {
        width: Dimensions.get('screen').width / 2.5,
        height: Dimensions.get('screen').width / 3, marginBottom: 10
    }
})