import * as React from 'react';
import {
    StyleSheet, View, Text, FlatList, Image, SafeAreaView, Dimensions, ScrollView
} from 'react-native';

import LobanovExclusive from "../../assets/images/main/ExclusiveTitle.svg"
import NewThings from "../../assets/images/main/Title.svg"
import Constants from "expo-constants";
import Footer from "../footer";
import Carousel from "../search/carousel";

export default function Main({navigation}) {
    const DATA1 = [
        {
            image: require('../../assets/images/lobanovDripProducts/1.jpg'),
            title: 'first aboba',
            id: 1,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/2.png'),
            title: 'second aboba',
            id: 2,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/3.png'),
            title: 'third aboba',
            id: 3,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/4.jpg'),
            title: 'fourth aboba',
            id: 4,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/5.jpg'),
            title: 'fifth aboba',
            id: 5,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/6.jpg'),
            title: 'sixth aboba',
            id: 6,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/7.jpg'),
            title: 'seventh aboba',
            id: 7,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/8.jpg'),
            title: 'eight aboba',
            id: 8,
            price: '500₴'
        },
    ];

    const DATA2 = [
        {
            image: require('../../assets/images/lobanovDripProducts/1.jpg'),
            title: 'first aboba',
            id: 1,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/2.png'),
            title: 'second aboba',
            id: 2,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/3.png'),
            title: 'third aboba',
            id: 3,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/4.jpg'),
            title: 'fourth aboba',
            id: 4,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/5.jpg'),
            title: 'fifth aboba',
            id: 5,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/6.jpg'),
            title: 'sixth aboba',
            id: 6,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/7.jpg'),
            title: 'seventh aboba',
            id: 7,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/8.jpg'),
            title: 'eight aboba',
            id: 8,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/6.jpg'),
            title: 'sixth aboba',
            id: 9,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/2.png'),
            title: 'second aboba',
            id: 10,
            price: '500₴'
        },
        {
            image: require('../../assets/images/lobanovDripProducts/4.jpg'),
            title: 'fourth aboba',
            id: 11,
            price: '500₴'
        },
    ]

    return (
        <View style={{flex: 11, paddingTop: Constants.statusBarHeight,}}>
            <ScrollView nestedScrollEnabled={true}>
                <View>
                    <Carousel/>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <LobanovExclusive/>
                </View>
                <SafeAreaView style={{flex: 3}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={DATA1} renderItem={({item}) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image}></Image>
                            <Text style={styles.itemText}>{item.title}</Text>
                            <Text style={{fontFamily: 'inter-regular', fontSize: 10, color: '#737373'}}>XS S M XL</Text>
                            <Text style={styles.itemText}>{item.price}</Text>
                        </View>
                    )} keyExtractor={item => item.id} numColumns='1'/>
                </SafeAreaView>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <NewThings/>
                </View>
                <View style={{flex: 5}}>
                    <FlatList scrollEnabled={false} data={DATA2} renderItem={({item}) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image}></Image>
                            <Text style={styles.itemText}>{item.title}</Text>
                            <Text style={{fontFamily: 'inter-regular', fontSize: 10, color: '#737373'}}>XS S M XL</Text>
                            <Text style={styles.itemText}>{item.price}</Text>
                        </View>
                    )} keyExtractor={item => item.id} numColumns='2'/>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    mainTextNew: {
        fontFamily: 'roboto-medium',
        fontSize: 30
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
