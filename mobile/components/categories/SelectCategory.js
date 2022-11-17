import React from "react";
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import Arrow from '../../assets/images/navigation/BackLeft.svg';
import ChooseGender from "./../search/chooseGender";



export default function SelectCategory({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.statusBar}/>
            <View style={styles.headerMenu} >
                <Arrow style={styles.arrow}/>
                <Text style={styles.textHeader}> CATEGORIES </Text>
            </View>
            <View style={{flex: 11}}>
                <ChooseGender/>
                <View style={styles.mainScreen}>
                    <View style={{flex:15, paddingEnd: '7%', paddingTop: '0%', paddingBottom: '3%' }}>
                        <Pressable style={styles.categories} onPress={() => navigation.push("ItemsByCategory", {category: 'Stock'})}>
                            <View style={styles.bottom}>
                                <Text style={styles.textBottom}> STOCK </Text>
                                <View style={{paddingRight: '2%'}}>
                                    <Image style={styles.img} source={require('../../assets/images/categories/stock.png')} />
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.categories} onPress={() => navigation.push("ItemsByCategory", {category: 'T-Shirt'})}>
                            <View style={styles.bottom}>
                                <Text style={styles.textBottom}> T-SHIRTS </Text>
                                <View style={{paddingRight: '1.5%'}}>
                                    <Image style={styles.img} source={require('../../assets/images/categories/t-shirts.png')} />
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.categories} onPress={() => navigation.push("ItemsByCategory", {category: 'Hoodie'})}>
                            <View style={styles.bottom}>
                                <Text style={styles.textBottom}> HOODIE </Text>
                                <View style={{paddingRight: '2%'}}>
                                    <Image style={styles.img} source={require('../../assets/images/categories/hoodie.png')} />
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.categories} onPress={() => navigation.push("ItemsByCategory", {category: 'Pants'})}>
                            <View style={styles.bottom}>
                                <Text style={styles.textBottom}> PANTS </Text>
                                <View style={{paddingRight: '2%'}}>
                                    <Image style={styles.img} source={require('../../assets/images/categories/pants.png')} />
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.categories} onPress={() => navigation.push("ItemsByCategory", {category: 'Backpack'})}>
                            <View style={styles.bottom}>
                                <Text style={styles.textBottom}> BACKPACKS </Text>
                                <View style={{paddingRight: '2%'}}>
                                    <Image style={styles.img} source={require('../../assets/images/categories/backpack.png')} />
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.categories} onPress={() => navigation.push("ItemsByCategory", {category: 'Case'})}>
                            <View style={styles.bottom}>
                                <Text style={styles.textBottom}> CASES </Text>
                                <View style={{paddingRight: '3%'}}>
                                    <Image style={styles.img} source={require('../../assets/images/categories/case.png')} />
                                </View>
                            </View>
                        </Pressable>
                        <Pressable style={styles.categories} onPress={() => navigation.push("ItemsByCategory", {category: 'Sweatshirt'})}>
                            <View style={styles.bottom}>
                                <Text style={styles.textBottom}> SWEATSHIRTS </Text>
                                <View style={{paddingRight: '3%'}}>
                                    <Image style={styles.img} source={require('../../assets/images/categories/sweatshirts.png')} />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        flex: 0.5,
        backgroundColor: '#323232',
    },
    headerMenu: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#323232',
        justifyContent: 'center',
    },

    textHeader: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'roboto-regular',
    },
    arrow: {
        position: 'absolute',
        top: '30%',
        left: '5%',
    },
    mainScreen: {
        flex: 10,
        backgroundColor: '#fff',
    },

    categories: {
        flex: 1,
        alignItems: 'flex-start',
        paddingStart: '7%',
        justifyContent: 'center',
        flexDirection: 'row',

    },

    bottom :{
        flexDirection: 'row',
        width: '100%',
        height: '70%',
        paddingStart: '10%',
        justifyContent: 'space-between',
        alignItems:'center',
        borderRadius: 10,
        backgroundColor: '#BBCBF5',

    },
    textBottom:{
        fontSize: 20,
        fontFamily:  'roboto-regular',
        fontWeight: '700'
    },
    img:{
        flex:1 ,
        aspectRatio: 1,
        resizeMode: 'contain'
    }
});
