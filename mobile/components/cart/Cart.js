import React, {useCallback, useEffect, useState} from "react";
import {
    Dimensions,
    FlatList, Image, Pressable, SafeAreaView, StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {SwipeablePanel} from "rn-swipeable-panel";
import ApplePay from "../../assets/images/card/apple-pay-payment-mark-seeklogo.com 1.svg";
import GooglePay from "../../assets/images/card/googlepay 1.svg";
import VisaMasterCard from "../../assets/images/card/cards 1.svg"
import SwipeToDeletePanel from "./swipeToDeletePanel";
import Constants from "expo-constants";
import Christ from "../../assets/images/login/xMark.svg"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default function Cart({navigation}) {
    const [swipeablePanelActive, setSwipeablePanelActive] = useState(true);
    const[cart, setCart] = useState([])
    const[itemNum, setItemNum] = useState(0);
    const getData = useCallback(async () => {
        try {
            setCart(JSON.parse(await AsyncStorage.getItem('cart')));
            setItemNum(cart.map(item => item.count).reduce((prev, curr) => prev + curr, 0));
        }
        catch (e) {}
    }, [cart])

    useEffect(() => {
       getData()
    }, [getData])

    const hidePanel = () => setSwipeablePanelActive(false);
    const showPanel = () => setSwipeablePanelActive(true);
    return (
        <>
            <View style={{height: Constants.statusBarHeight, backgroundColor: '#0D0D0D'}}>

            </View>
            <View style={{flex:1, backgroundColor: '#0D0D0D'}}>
                <View style={{flex:0.7, flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable style={{left: '30%'}} onPress={() => console.log(cart)}>
                        <Christ/>
                    </Pressable>
                    <Text style={{fontFamily: 'roboto-medium',
                        fontSize: 30,
                        left: '110%',
                        color: '#FFFFFF'
                    }}>CARD <Text style={{backgroundColor: 'grey'}}> {itemNum} ITEMS </Text></Text>
                </View>
                <View style={{flex: 0.3}}>
                    <Text style={{color: '#014DB5', textAlign: 'center', bottom: '10%', fontSize: 13}}>Do not offer bathing. Adding goods to cats is not for bookings</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#272727', bottom: '1%'}}/>
                </View>
                <View style={{flex: 6}}>
                    <SwipeToDeletePanel/>
                </View>
                <View style={{flex: 0.5}}/>
                <View style={{flex: 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: '4%'
                }}>
                    <TouchableOpacity style={styles.orderButton} onPress={() => showPanel()}>
                        <Text style={styles.orderButtonText}>
                            BACK TO ORDER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SwipeablePanel
                isActive={swipeablePanelActive}
                onClose={() => hidePanel()}
                smallPanelHeight={300}
                fullWidth
                closeOnTouchOutside
                noBackgroundOpacity
                scrollViewProps={{
                    scrollEnabled: false
                }}
                style={{
                    backgroundColor: "#1D1C1C",
                }}
            >
                <Text style={{
                    fontSize: 15,
                    fontFamily: "roboto-medium",
                    color: 'white',
                    left: '5%'
                }}>
                    Delivery: 10₴
                </Text>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "roboto-medium",
                    color: 'white',
                    left: '5%',
                    top: '3%'
                }}>
                    Clothes price: 398₴
                </Text>
                <TouchableOpacity style={styles.orderButtonInPanel}>
                    <Text style={styles.orderButtonText}>
                        MAKE AN ORDER
                    </Text>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 15,
                    fontFamily: "roboto-medium",
                    color: '#616161',
                    top: '13%',
                    textAlign: 'center',
                }}>
                    SWIPE FOR FULL ORDER INFO
                </Text>
                <Text style={{
                    fontSize: 18,
                    fontFamily: "roboto-medium",
                    color: '#616161',
                    top: '19%',
                    left: '5%'
                }}>
                    PAYMENT METHODS:
                </Text>
                <View style={{flex: 1, flexDirection: 'row', top: '20%', left: '3%'}}>
                    <VisaMasterCard/>
                    <View style={{left: '5%'}}>
                        <GooglePay/>
                    </View>
                    <View style={{left: '20%'}}>
                        <ApplePay/>
                    </View>
                </View>
                <Text style={{
                    fontSize: 15,
                    fontFamily: "roboto-medium",
                    color: '#CBCBCB',
                    top: '28%',
                    width: '90%',
                    left: '5%',
                    textAlign: "justify"
                }}>
                    When choosing a delivery method at the point of choice, payment can only be made online on the
                    site. If online payment is not far away, it is possible that it is due to the fact that you have
                    paid for the cordon (trading international payments), in which case you need to go back to your
                    bank.


                    365 days for a return
                    Free shipping to 950 UAH


                    365 days for a return
                    Free shipping to 950 UAH
                    We appreciate your respect: as the amount of unmanaged orders, as created in the online stores
                    of the LPP brand, we will change the equivalent of 150 euros (delivery costs) - the amount of
                    the parcel, if you remove it, will be deposited in the additional vartost of the tax.
                </Text>
            </SwipeablePanel>
        </>
    );
}

const styles = StyleSheet.create({
    orderButton: {
        flex:1,
        top: '-5%',
        width: '60%',
        height: '5%',
        backgroundColor: '#DB2525',
        alignItems: "center",
        justifyContent: "center"
    },
    orderButtonText: {
        fontFamily: 'VCR_OSD_MONO',
        color: 'white',
        fontSize: 20
    },
    orderButtonInPanel: {
        width: 279,
        height: 42,
        left: '16.5%',
        top: '8%',
        backgroundColor: '#DB2525',
        alignItems: "center",
        justifyContent: "center"
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        marginRight: '55%',
        top: '25%',
        borderColor:'red',
    },
    image: {
        width: Dimensions.get('screen').width / 2.7,
        height: Dimensions.get('screen').width / 3.2, marginBottom: 10
    }
})
