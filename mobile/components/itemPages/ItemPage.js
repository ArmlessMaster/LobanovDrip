import {
    Alert,
    Dimensions,
    FlatList, Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Christ from "../../assets/images/BlackChrist.svg";
import Cart from "../../assets/images/menu/blackCart.svg"
import Carousel from "./carousel";
import Constants from 'expo-constants';
import {ColorButtonGroup} from "./ColorButtonGroup";
import Ruler from '../../assets/images/Ruler.svg'
import SafeAreaView, {SafeAreaProvider} from "react-native-safe-area-view";
import {SizeButtonGroup} from "../filter/SizeButtonGroup";
import {useHttp} from "../../hooks/http.hook";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const statusBarHeight = Constants.statusBarHeight;

const printButtonLabel = (item) => {
    console.log(item)
}

const ItemPage = ({navigation}) => {
    const [size, setSize] = useState()
    const sizeButtonsToRoot = (button) => {
        setSize(button)
    }
    const [color, setColor] = useState()
    const colorButtonToRoot = (button) => {
        setColor(button)
    }
    const [cart, setCart] = useState([])
    const [isItemInCart, setIsItemInCart] = useState(false);

    const setItem = async (item) => {
        await AsyncStorage.setItem(
            'cart',
            item
        );
    }

    function isItemHere(cart) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].clothes_id === itemId && cart[i].size === size && cart[i].color === color) return true;
        }
        return false;
    }

    const addItemToCart = async () => {
        try {
            setCart(JSON.parse(await AsyncStorage.getItem('cart')) !== null ? JSON.parse(await AsyncStorage.getItem('cart')) : [])
            setIsItemInCart(isItemHere(cart))
            if (isItemInCart) {
                console.log(true)
                await AsyncStorage.setItem(
                    'cart',
                    JSON.stringify(cart.map((item) => { item.count = (item.clothes_id === itemId && item.color === color && item.size === size) ? item.count + 1 : item.count}))
                );
            } else {
                console.log(false)
                await AsyncStorage.setItem(
                    'cart',
                    JSON.stringify([...cart, {clothes_id: itemId, count: 1, size: size, color: color, name: clothesData.name, price: clothesData.price, image: clothesData.imagesUrls[0]}])                );
            }
            Alert.alert(
                'Success',
                'Item was successfully added to the cart.',
                [
                    {
                        text: 'OK'
                    },
                ],
                {cancelable: false},
            );
        } catch (error) {
        }
    };

    const auth = useContext(AuthContext)
    const printColor = (item) => {
        console.log(item)
    }
    const [hasLoaded, setHasLoaded] = useState(false)
    const itemId = navigation.getParam('itemId')
    const [clothesData, setClothesData] = useState([]);
    const { loading, request } = useHttp();
    const [collection, setCollection] = useState()
    const root = navigation.getParam('root')
    const fetchClothesData = useCallback(async () => {
        try {
            const clothData = await axios.get(`https://lobanovdriptest.herokuapp.com/api/clothes/find?_id=${itemId}`)
            setClothesData(clothData.data.clothes[0])

            const method = "GET";
            let body = {user_id: getId(auth.token), status: "cart"};
            body = JSON.stringify(body);
            const headers = {Authorization: `Bearer ` + `${auth.token}`};
            headers["Content-Type"] = "application/json";
            const response = await fetch(`https://lobanovdriptest.herokuapp.com/api/account/update/password`, {
                method,
                body,
                headers,
            });
            const data = await response.json()
            console.log(data);
            setHasLoaded(true)
        }
        catch (e) {}
    }, [itemId])

    useEffect(() => {
        fetchClothesData()
    }, [fetchClothesData])

    const fetchCollections = useCallback(async () => {
        try {
            if (clothesData?.collection_id !== null) {
                const collectionData = await axios.get(`https://lobanovdriptest.herokuapp.com/api/clothes/find?collection_id=${clothesData?.collection_id?._id}`)
                setCollection(collectionData.data.clothes)
            } else {
                const collectionData = await axios.get(`https://lobanovdriptest.herokuapp.com/api/clothes/find?type=${clothesData?.type}`)
                setCollection(collectionData.data.clothes)
            }
            setHasLoaded(true)
        }
        catch (e) {}
    }, [clothesData?.collection_id, clothesData?.type])

    useEffect(() => {
        fetchCollections()
    }, [fetchCollections])

    const colors = []
    if (hasLoaded) {
        clothesData.color.forEach(element => {
            colors.push(element.toLowerCase());
        });
    }

    const sizes = []
    if (hasLoaded) {
        clothesData.clothesCount.forEach(element => {
            sizes.push(element.size.toUpperCase())
        })
    }

    const available = []
    if (hasLoaded) {
        clothesData.clothesCount.forEach(element => {
            if (element.count > 0) available.push(true)
            else available.push(false)
        })
    }

    function getId (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload).id;
    }

    return hasLoaded ? (
        <SafeAreaProvider>
            <SafeAreaView style={{paddingTop: statusBarHeight}}>
                <ScrollView stickyHeaderIndices={[0]}>
                    <View style={{zIndex: 1, backgroundColor: 'white'}}>
                        <Carousel images={clothesData.imagesUrls}/>
                        <View style={{position: 'absolute', flexDirection: 'row'}}>
                            <Pressable style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}
                                       onPress={() => navigation.navigate(root)}>
                                <Christ></Christ>
                            </Pressable>
                            <View style={{flex: 1}}></View>
                            <Pressable style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('Cart')}>
                                <Cart style={{flex: 1}}></Cart>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{zIndex: 20, backgroundColor: 'white', paddingTop: '5%'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{flex: 4, paddingLeft: '5%', fontFamily: 'inter-regular', fontSize: 16}}>
                                {clothesData.name}
                            </Text>
                            <Text style={{flex: 1, textAlign:'right', paddingRight: '5%', fontFamily: 'roboto-regular',
                                fontSize: 18}}>{clothesData.price}₴</Text>
                        </View>
                        <View style={{borderWidth: 0.75, borderColor: '#C6C6C6', width: '90%', alignSelf: 'center'}}/>
                        <Text style={{paddingTop: '5%', fontFamily: 'roboto-regular', fontSize: 14, flex: 1,
                            textAlign: 'center', color: '#8A8A8A'}}>COLORS</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: '3%'}}>
                            <ColorButtonGroup style={{top:'50%'}} buttons={colors}
                                              doSomethingAfterClick={printColor} colorButtonToRoot={colorButtonToRoot}></ColorButtonGroup>
                        </View>
                        <View style={{borderWidth: 0.75, borderColor: '#C6C6C6', width: '90%', alignSelf: 'center',
                            marginTop: '5%'}}/>
                        <Text style={{paddingTop: '5%', fontFamily: 'roboto-regular', fontSize: 14, flex: 1,
                            textAlign: 'center', color: '#8A8A8A'}}>SIZE</Text>
                        <View style={{flex: 1}}/>
                        <View style={{paddingTop: '5%', height: '6.5%',  alignItems: 'center', justifyContent: 'space-around'}}>
                            <SizeButtonGroup buttons={sizes} available={available}
                                             doSomethingAfterClick={printButtonLabel} multiple={false} sizeButtonsToRoot={sizeButtonsToRoot}></SizeButtonGroup>
                        </View>

                        <Pressable style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: '5%'}}>
                            <Ruler></Ruler>
                            <Text style={{fontFamily: 'roboto-regular', fontSize: 14, marginHorizontal: '1%'}}>Перевір свій розмір.</Text>
                        </Pressable>
                        <Pressable style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: '5%'}} onPress={addItemToCart}>
                            <View style={{backgroundColor: '#B03737', width: '80%'}}>
                                <Text style={{paddingVertical: '3%', textAlign: 'center', fontFamily: 'roboto-regular', fontSize: 16, color: 'white'}}>Додати до кошику</Text>
                            </View>
                        </Pressable>
                        <View style={{flex: 3, paddingHorizontal: '5%'}}>
                            <Text style={{marginTop: '5%', fontFamily: 'roboto-regular', fontSize: 14}}>
                                {'Material:\n' + `${clothesData.material}`}
                            </Text>
                            <Text style={{marginTop: '5%', fontFamily: 'roboto-regular', fontSize: 14}}>
                                {'Care:\n' + `${clothesData.care}`}
                            </Text>
                        </View>
                        <View style={{borderWidth: 0.75, borderColor: '#C6C6C6', width: '90%', alignSelf: 'center',
                            marginTop: '5%'}}/>
                        <Text style={{flex: 1, fontFamily: 'roboto-regular', fontWeight: "800", fontSize: 16, textAlign: 'center', marginVertical: '5%'}}>
                            COMPLETE YOUR LOOK
                        </Text>
                        {/* bottom slider*/}
                        <View style={{flex: 3}}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={collection} renderItem={({item, index}) => (
                                <Pressable key={index} style={styles.item} onPress={() =>{navigation.push('ItemPage', {itemId: item._id, root: root})}}>
                                    <Image source={{uri: item.imagesUrls[0]}} style={styles.image}></Image>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        {item.clothesCount.map((size, index) => {
                                            return(<Text style={{fontFamily: 'inter-regular', fontSize: 10, color: '#737373'}} key={index}>{`${size.size.toUpperCase() + " "}`}</Text>)
                                        })}
                                    </View>
                                    <Text style={styles.itemText}>{item.price}</Text>
                                </Pressable>
                            )} keyExtractor={item => item._id} numColumns='1'/>
                        </View>
                    </View>

                </ScrollView>

            </SafeAreaView>
        </SafeAreaProvider>

    ) : <View><Text>Loading...</Text></View>


}

const styles = StyleSheet.create({
    whiteSquare: {
        width: 25,
        height: 25,
        backgroundColor: "#F0F0F0",
        marginHorizontal: '1%'
    },
    blackSquare: {
        width: 25,
        height: 25,
        backgroundColor: "#1A1A1A",
        marginHorizontal: '1%'
    },

    activatedSquare: {
        borderWidth: 1,
        borderColor: '#919191'
    },
    image: {
        width: Dimensions.get('screen').width / 3,
        height: Dimensions.get('screen').height / 7, marginBottom: 10
    },
    item: {
        marginHorizontal: 25,
        marginVertical: 10,
        marginRight: 5,
        maxWidth: Dimensions.get('screen').width / 3
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'inter-regular',
        fontWeight: '600',
    },
})

export default ItemPage