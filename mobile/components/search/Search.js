import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import React, { useCallback, useEffect, useState} from 'react';
import Loupe from "../../assets/images/search 1.svg";
import SafeAreaView, {SafeAreaProvider} from 'react-native-safe-area-view';
import ChooseGender from "./chooseGender";
import {useHttp} from "../../hooks/http.hook";
import ItemPage from "../itemPages/ItemPage"
import BackArrow from "../../assets/images/navigation/Back.svg"

export default function Search({navigation}) {

    const [clothes, setClothes] = useState([]);
    const { loading, request } = useHttp();
    const [search, setSearch] = useState("")
    const [delayedSearch, setDelayedSearch] = useState("")
    const fetchClothes = useCallback(async () => {
        try {
            await request(`https://lobanovdriptest.herokuapp.com/api/clothes/find?name=${delayedSearch}&fullTextSearch=true`,
                'GET', null).then((res) => {setClothes(res.clothes)})
        }
        catch (e) {}
    }, [request, delayedSearch])


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDelayedSearch(search);
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [search, request]);

    useEffect(() => {
        fetchClothes()
    }, [fetchClothes])

    return  (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 10.5}}>
                <View style={{backgroundColor: '#323232', flex: 0.5}}></View>
                <View style={{
                    flex: 0.8, backgroundColor: '#323232', justifyContent: 'flex-end',
                    alignItems: 'center', flexDirection: 'row'
                }}>
                    <Loupe style={{flex: 1, left: '10%'}}></Loupe>
                    <TextInput style={styles.searchInput} onChangeText={ ( value ) => setSearch(value)} placeholder=" Search..." placeholderTextColor='white'></TextInput>
                    <Pressable style={{right: '25%', top:'1%'}}><BackArrow/></Pressable>
                </View>
                <View style={{borderWidth: 0.75, borderColor: 'white', bottom: '1.5%', width: '50%', alignSelf: 'center', right:'22%'}}/>
                <ChooseGender />
                <SafeAreaProvider style={{flex: 9}}>

                    <SafeAreaView>
                        <FlatList data={clothes} renderItem={({item, index}) => (
                            <Pressable key={index} style={styles.item} onPress={() =>{navigation.navigate('ItemPage', {itemId: item._id, root: 'SwipeStore'})}}>
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
        left: '10%'
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