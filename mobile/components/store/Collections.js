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
import Footer from "./../footer";
import axios from "axios";
import {useHttp} from "../../hooks/http.hook";

export default function Collections({navigation}) {

    const id = navigation.getParam("id")
    const name = navigation.getParam('name')
    const [clothes, setClothes] = useState([])
    const [hasLoaded, setHasLoaded] = useState(false)
    const { loading, request } = useHttp();
    const fetchClothes = useCallback(async () => {
        try {
            await request(`https://lobanovdriptest.herokuapp.com/api/clothes/find?collection_id=${id}`,
                'GET', null).then((res) => {setClothes(res.clothes)})
            setHasLoaded(true)
        }
        catch (e) {}
    }, [request])

    useEffect(() => {
        fetchClothes()
    }, [fetchClothes])

    return hasLoaded ? (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 10.5}}>
                <View style={{backgroundColor: '#323232', flex: 0.5}}></View>
                <View style={{
                    flex: 1, backgroundColor: '#323232', justifyContent: 'flex-end',
                    alignItems: 'center', flexDirection: 'row'
                }}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontFamily: 'roboto-medium', fontSize: 20}}>{name}</Text>
                    </View>
                    <Pressable style={{right: '30%', top: '0.5%'}} onPress={() => navigation.goBack()}><Arrow/></Pressable>
                </View>
                <View style={{flex: 10, backgroundColor: 'white'}}>
                    <FlatList data={clothes} renderItem={({item, index}) => (
                        <Pressable key={index} style={styles.item} onPress={() =>{navigation.navigate('ItemPage', {itemId: item._id, root: 'Collections'})}}>
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
                </View>
            </View>
            <Footer style={{flex: 1}} navigation={navigation}/>
        </View>
    ) : <View><Text>Loading..</Text></View>
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