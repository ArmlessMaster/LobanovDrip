import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Pressable,
} from 'react-native';

import LobanovExclusive from "../../assets/images/main/ExclusiveTitle.svg"
import NewThings from "../../assets/images/main/Title.svg"
import {useCallback, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import Swiper from "react-native-swiper";
import Carousel from "../itemPages/carousel"


export default function Store({navigation}) {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [tShirts, setTShirts] = useState([]);
    const [hoodies, setHoodies] = useState([]);
    const [sweatshirts, setSweatshirts] = useState([]);
    const [exclusive, setExclusive] = useState([]);
    const [collections, setCollections] = useState([])
    const { loading, request } = useHttp();
    const fetchClothes = useCallback(async () => {
        try {
            await request(`https://lobanovdriptest.herokuapp.com/api/clothes/find?type=T-Shirt&limit=2`,
                'GET', null).then((res) => {setTShirts(res.clothes)})
            await request(`https://lobanovdriptest.herokuapp.com/api/clothes/find?type=Sweatshirt&limit=2`,
                'GET', null).then((res) => {setSweatshirts(res.clothes)})
            await request(`https://lobanovdriptest.herokuapp.com/api/clothes/find?type=Hoodie&limit=2`,
                'GET', null).then((res) => {setHoodies(res.clothes)})
            await request(`https://lobanovdriptest.herokuapp.com/api/clothes`,
                'GET', null).then((res) => {setExclusive(res.clothes)})
            await request(`https://lobanovdriptest.herokuapp.com/api/collection`,
                'GET', null).then((res) => {setCollections(res.collections)})
            setHasLoaded(true)
        }
        catch (e) {}
    }, [request])

    useEffect(() => {
        fetchClothes()
    }, [fetchClothes])


    return hasLoaded ? (
        <View>
            <SafeAreaView>
                <ScrollView>
                    <Swiper autoplay={true} scrollEnabled={true} activeDot={<View style={[styles.dots, {backgroundColor: '#B84242'}]} />}
                            dot={<View style={[styles.dots, {backgroundColor: '#FFFFFF'}]} />} style={{height: Dimensions.get('screen').height/4}}>
                        {collections.map((item, index) => {
                            return(
                                <Pressable key={item._id} onPress={() => navigation.navigate("Collections", {id: item._id, name: item.name})}>
                                    <Image style={{aspectRatio:2}} source={{uri: item.imagesUrls[3]}}/>
                                    <Image style={{width: '100%' , height:'100%', resizeMode: 'contain', position: 'absolute'}} source={{uri: item.imagesUrls[2]}}/>
                                </Pressable>)
                        })}
                    </Swiper>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <LobanovExclusive/>
                    </View>
                    <SafeAreaView style={{flex: 3}}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={exclusive} renderItem={({item}) => (
                            <Pressable style={styles.item} onPress={() => navigation.navigate('ItemPage', {itemId: item._id, root: 'SwipeStore'})}>
                                <Image source={{uri: item.imagesUrls[0]}} style={styles.image}></Image>
                                <Text styles={styles.itemText}>{`${item.name}`}</Text>
                                <View style={{flexDirection:'row'}}>
                                    {item.clothesCount.map((size, index) => {
                                        return(<Text style={styles.sizeText} key={index}>{`${size.size.toUpperCase() + " "}`}</Text>)
                                    })}
                                </View>
                                <Text style={styles.itemText}>{`${item.price}` + '₴'}</Text>
                            </Pressable>
                        )} keyExtractor={item => item._id} numColumns='1'/>
                    </SafeAreaView>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <NewThings/>
                    </View>
                    <View style={{flex: 5}}>
                        <View style={{flexDirection: 'row'}}>
                            {
                                tShirts.map((item)=> (
                                    <Pressable key={item._id} style={styles.item} onPress={() => navigation.navigate('ItemPage', {itemId: item._id, root: 'SwipeStore'})}>
                                        <Image source={{uri: item.imagesUrls[0]}} style={styles.image}></Image>
                                        <Text styles={styles.itemText}>{`${item.name}`}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            {item.clothesCount.map((size, index) => {
                                                return(<Text style={styles.sizeText} key={index}>{`${size.size.toUpperCase() + " "}`}</Text>)
                                            })}
                                        </View>
                                        <Text style={styles.itemText}>{`${item.price}` + '₴'}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            {
                                hoodies.map((item)=> (
                                    <Pressable key={item._id} style={styles.item} onPress={() => navigation.navigate('ItemPage', {itemId: item._id, root: 'SwipeStore'})}>
                                        <Image source={{uri: item.imagesUrls[0]}} style={styles.image}></Image>
                                        <Text styles={styles.itemText}>{`${item.name}`}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            {item.clothesCount.map((size, index) => {
                                                return(<Text style={styles.sizeText} key={index}>{`${size.size.toUpperCase() + " "}`}</Text>)
                                            })}
                                        </View>
                                        <Text style={styles.itemText}>{`${item.price}` + '₴'}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            {
                                sweatshirts.map((item)=> (
                                    <Pressable key={item._id} style={styles.item} onPress={() => navigation.navigate('ItemPage', {itemId: item._id, root: 'SwipeStore'})}>
                                        <Image source={{uri: item.imagesUrls[0]}} style={styles.image}></Image>
                                        <Text styles={styles.itemText}>{`${item.name}`}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            {item.clothesCount.map((size, index) => {
                                                return(<Text style={styles.sizeText} key={index}>{`${size.size.toUpperCase() + " "}`}</Text>)
                                            })}
                                        </View>
                                        <Text style={styles.itemText}>{`${item.price}` + '₴'}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    ) : <View></View>
};

const styles = StyleSheet.create({
    mainTextNew: {
        fontFamily: 'roboto-medium',
        fontSize: 30
    },
    sizeText: {
        color: 'gray',
        fontSize: 10
    },
    price: {
        fontFamily: 'inter-medium',
        fontWeight: "bold"
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
        maxWidth: Dimensions.get('screen').width / 2.5
    },
    image: {
        width: Dimensions.get('screen').width / 2.5,
        height: Dimensions.get('screen').width / 3, marginBottom: 10
    },
    dots: {
        shadowColor: 'rgba(0, 0, 0, 0.65)', shadowRadius:4, shadowOffset:{width: 0, height: 0}, width: 8, height: 8,
        borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3
    }
})
