
import React, {useCallback, useEffect, useState} from 'react';
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Animated,
    useWindowDimensions, Image, Dimensions,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Icon} from 'react-native-eva-icons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const hapticFeedbackOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};


const VisibleItem = props => {
    const {data, screenWidth, rowKey} = props;

    return (
        <TouchableWithoutFeedback onPress={() => console.log('touched')}>
            <Animated.View
                style={[
                    styles.rowFront,
                    {
                        height: rowAnimatedValues[rowKey].rowHeight,
                        transform: [
                            {
                                translateX: rowAnimatedValues[
                                    rowKey
                                    ].rowFrontTranslate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-screenWidth, 0],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    },
                ]}>
                <View style={{left: '20%'}}>
                    <Image style={styles.image} source={{uri: data.item.image}}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={{
                        color:'#FFFFFF',
                        width: 200,
                        left: '15%',
                        fontFamily: 'roboto-medium',
                        fontSize: 18
                    }}>{data.item.name}</Text>
                    <Text style={{
                        color:'#737373',
                        width: 200,
                        left: '15%',
                        fontFamily: 'roboto-medium',
                        fontSize: 15
                    }}>
                        {data.item.size}
                    </Text>
                    <Text style={{
                        color:'#FFFFFF',
                        width: 200,
                        left: '15%',
                        fontFamily: 'roboto-medium',
                        fontSize: 20
                    }}>
                        {data.item.price}₴
                    </Text>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const HiddenItemWithActions = props => {
    const {
        leftActionActivated,
        rightActionActivated,
        swipeAnimatedValue,
        onClose,
        onDelete,
        rowKey,
    } = props;

    if (rightActionActivated) {
        ReactNativeHapticFeedback.trigger('impactLight', hapticFeedbackOptions);
        Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
            toValue: Math.abs(swipeAnimatedValue.__getValue()),
            duration: 250,
            useNativeDriver: false,
        }).start();
    } else {
        Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
            toValue: 100,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }

    return (
        <Animated.View
            style={[styles.rowBack, {height: rowAnimatedValues[rowKey].rowHeight}]}>
            {!rightActionActivated && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <Animated.View
                        style={[
                            styles.backBtn,
                            styles.backLeftBtn,
                            {
                                transform: [
                                    {
                                        translateX: swipeAnimatedValue.interpolate({
                                            inputRange: [0, 60, 100],
                                            outputRange: [-100, -40, 0],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            },
                        ]}>
                        <View style={styles.backBtnInner}>
                            <Icon
                                name="arrow-forward-outline"
                                fill="#fff"
                                width={26}
                                height={26}
                            />
                            <Text style={styles.backBtnText}>Left</Text>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}
            {!leftActionActivated && (
                <TouchableWithoutFeedback onPress={onClose}>
                    <Animated.View
                        style={[
                            styles.backBtn,
                            styles.backRightBtn,
                            styles.backRightBtnLeft,
                            {
                                width: 100,
                                transform: [
                                    {
                                        translateX: swipeAnimatedValue.interpolate({
                                            inputRange: [-200, -120, 0],
                                            outputRange: [-100, -20, 100],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            },
                        ]}>
                        <View style={styles.backBtnInner}>
                            <Icon
                                name="arrow-back-outline"
                                fill="#fff"
                                width={26}
                                height={26}
                            />
                            <Text style={styles.backBtnText}>Right</Text>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}
            {!leftActionActivated && (
                <TouchableWithoutFeedback onPress={onDelete}>
                    <Animated.View
                        style={[
                            styles.backBtn,
                            styles.backRightBtn,
                            styles.backRightBtnRight,
                            {
                                width: rowAnimatedValues[rowKey].rowBackWidth,
                                transform: [
                                    {
                                        translateX: swipeAnimatedValue.interpolate({
                                            inputRange: [-200, -120, 0],
                                            outputRange: [0, 40, 100],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            },
                        ]}>
                        <View style={styles.backBtnInner}>
                            <Icon name="trash-2-outline" fill="#fff" width={26} height={26} />
                            <Text style={styles.backBtnText}>Delete</Text>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}
        </Animated.View>
    );
};
const rowAnimatedValues = {};


export default function SwipeToDeletePanel(){

    const [cart, setCart] = useState([])
    const [list, setList] = useState([])
    const [itemNum, setItemNum] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const getData = useCallback(async () => {
        try {
            setCart(JSON.parse(await AsyncStorage.getItem('cart')));
            setItemNum(cart.map(item => item.count).reduce((prev, curr) => prev + curr, 0));
        }
        catch (e) {}
    }, [cart])


    const getList = useCallback(async () => {
        try {
            setList([...new Array(itemNum)].map((_, i) => ({
                key: `${i}`,
                size: cart[i].size,
                name: cart[i].name,
                price: cart[i].price,
                image: cart[i].image,
            })))
            setHasLoaded(true)
        } catch (e) {}
    }, [cart])

    useEffect(() => {
        getData()
        getList()
    }, [getData, getList])

    Array(itemNum)
        .fill('')
        .forEach((_, i) => {
            rowAnimatedValues[`${i}`] = {
                rowHeight: new Animated.Value(Dimensions.get('screen').width / 3.2),
                rowFrontTranslate: new Animated.Value(1),
                rowBackWidth: new Animated.Value(100),
            };
        });

    const backgroundStyle = {
        backgroundColor: '#0D0D0D',
    };
    const {width: screenWidth} = useWindowDimensions();

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = rowKey => {
        const newData = list.filter(item => item.key !== rowKey);
        setList(newData);
    };

    const onDelete = rowKey => {
        Animated.timing(rowAnimatedValues[rowKey].rowFrontTranslate, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
            toValue: screenWidth,
            duration: 200,
            useNativeDriver: false,
        }).start();
        Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
            toValue: 0,
            delay: 200,
            duration: 200,
            useNativeDriver: false,
        }).start(() => deleteRow(rowKey));
    };

    const onRightActionStatusChange = rowKey => {
        console.log('on right action status change');
    };

    const swipeGestureEnded = (rowKey, data) => {
        if (data.translateX < -200) {
            Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
                toValue: screenWidth,
                duration: 200,
                useNativeDriver: false,
            }).start();
            Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
                toValue: 0,
                delay: 200,
                duration: 200,
                useNativeDriver: false,
            }).start(() => deleteRow(rowKey));
        }
    };

    const renderItem = (data, rowMap) => {
        return (
            <VisibleItem
                data={data}
                rowKey={data.item.key}
                screenWidth={screenWidth}
            />
        );
    };

    const renderHiddenItem = (data, rowMap) => (
        <HiddenItemWithActions
            data={data}
            rowMap={rowMap}
            rowKey={data.item.key}
            onClose={() => closeRow(rowMap, data.item.key)}
            onDelete={() => onDelete(data.item.key)}
        />
    );

    return (
        <View
            style={{flex: 1,backgroundColor: '#0D0D0D'}}
        >
            <SafeAreaView style={{backgroundColor: '#0D0D0D'}}>
                <SwipeListView
                    data={list}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={60}
                    rightOpenValue={-120}
                    stopLeftSwipe={0.1}
                    stopRightSwipe={-201}
                    rightActivationValue={-200}
                    rightActionValue={-screenWidth}
                    onRightActionStatusChange={onRightActionStatusChange}
                    swipeGestureEnded={swipeGestureEnded}
                    swipeToOpenPercent={10}
                    swipeToClosePercent={10}
                    useNativeDriver={false}
                    swipeRowStyle={{height: Dimensions.get('screen').width / 3}}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    rowFront: {
        height: 60,
        flexDirection: "row",
        backgroundColor: '#0D0D0D',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backBtn: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        justifyContent: 'center',
    },
    backLeftBtn: {
        alignItems: 'flex-end',
        backgroundColor: 'green',
        paddingRight: 16,
    },
    backRightBtn: {
        right: 0,
        alignItems: 'flex-start',
        paddingLeft: 12,
    },
    backRightBtnLeft: {
        backgroundColor: '#A1A1A1',
    },
    backRightBtnRight: {
        backgroundColor: '#A1A1A1',
    },
    backBtnInner: {
        alignItems: 'center',
    },
    backBtnText: {
        color: 'white',
        marginTop: 2,
    },
    image: {
        width: Dimensions.get('screen').width / 3.5,
        height: Dimensions.get('screen').width / 4,
    }
});
