import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import React from 'react';
import Arrow from "../../assets/images/rightArrow.svg";
import Footer from "../footer";
import Loupe from "../../assets/images/search 1.svg";
import {Line} from "react-native-svg";

export default function Search() {

    const DATA = [
        {
            image: require('../../assets/images/lobanovDripProducts/1.jpg'),
            title: 'first aboba',
            id: 1,
            price: '500'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/2.png'),
            title: 'second aboba second aboba second aboba second aboba',
            id: 2,
            price: '500'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/3.png'),
            title: 'third aboba',
            id: 3,
            price: '500'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/4.jpg'),
            title: 'fourth aboba',
            id: 4,
            price: '500'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/5.jpg'),
            title: 'fifth aboba',
            id: 5,
            price: '500'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/6.jpg'),
            title: 'sixth aboba',
            id: 6,
            price: '500'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/7.jpg'),
            title: 'seventh aboba',
            id: 7,
            price: '500'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/8.jpg'),
            title: 'eight aboba',
            id: 8,
            price: '500'
        },
    ];

    return (
        <View style={{flex: 1}}>
            <View style={{backgroundColor: '#323232', flex: 0.5}}></View>
            <View style={{
                flex: 1,
                backgroundColor: '#323232',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Loupe style={{flex: 1, left: '50%'}}></Loupe>
                <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor='white'>
                </TextInput>
                <Pressable style={{right: '20%'}}>
                    <Arrow/>
                </Pressable>
            </View>
            <View style={{borderWidth: 0.75, borderColor: 'white', bottom: '1%', width: '80%', alignSelf: 'center'}}/>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable style={styles.filter}>
                    <Text style={{fontSize: 18, fontFamily: 'roboto-regular'}}>Filter</Text>
                </Pressable>
            </View>
            <SafeAreaView style={{flex: 9}}>
                <FlatList data={DATA} renderItem={({item}) => (
                    <View style={styles.item}>
                        <Image source={item.image} style={styles.image}></Image>
                        <Text style={styles.itemText}>{item.title}</Text>
                        <Text style={{fontFamily: 'inter-regular', fontSize: 10, color: '#737373'}}>XS S M XL</Text>
                        <Text style={styles.itemText}>{item.price}</Text>
                    </View>
                )} keyExtractor={item => item.id} numColumns='2'/>
            </SafeAreaView>
            <Footer/>
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
        marginRight: 5
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'inter-regular',
        maxWidth: Dimensions.get('screen').width / 2.5
    },
    image: {
        width: Dimensions.get('screen').width / 2.5,
        height: Dimensions.get('screen').width / 3, marginBottom: 10
    }
})