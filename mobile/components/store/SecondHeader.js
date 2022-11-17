import React from 'react';
import {
    Animated,
    Text,
    View,
    StyleSheet,
    RefreshControl,
    TouchableOpacity,
    Platform, Pressable,
} from 'react-native';
import Constants from 'expo-constants';
import Store from "./Store";
import Loupe from "../../assets/images/search 1.svg"
import ArrowRight from "../../assets/images/Arrow4Right.svg"
import LeftArrow from "../../assets/images/Arrow 4.svg"

const HEADER_HEIGHT = 50 + Constants.statusBarHeight

const wait = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

const scrollAnim = new Animated.Value(0);
const clampedScrollY = scrollAnim.interpolate({
    inputRange: [HEADER_HEIGHT, (HEADER_HEIGHT +1)],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
});
const minusScrollY = Animated.multiply(clampedScrollY, -1);
const translateY = Animated.diffClamp(minusScrollY, -HEADER_HEIGHT*2, 0);
const scale = scrollAnim.interpolate({
    inputRange: [HEADER_HEIGHT, 2 * HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
});

export default function SecondHeader({navigation}) {
    const [refreshing, setRefreshing] = React.useState(false);

    const scrollRef = React.useRef();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.ScrollView nestedScrollEnabled={true}
                ref={scrollRef}
                style={{
                    zIndex: 0,
                    height: '100%',
                    elevation: -1,
                }}
                scrollEventThrottle={1}
                bounces={false}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollAnim } } }],
                    { useNativeDriver: true }
                )}
                overScrollMode="never"
                contentInset={{ top: HEADER_HEIGHT }}
                contentOffset={{ y: -HEADER_HEIGHT }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                <Store navigation={navigation}/>

            </Animated.ScrollView>

            <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>

                <View style={styles.header}>
                    <View style={{flex:1}}>
                        <View style={{flex: 1,  flexDirection: 'row'}}>
                            <Pressable>

                                <View></View>
                                <LeftArrow style={styles.arrowL}></LeftArrow>
                                <Loupe style={{flex: 1, left: '190%', top: '52%'}}></Loupe>
                            </Pressable>
                            <Text style={styles.searchInput}>
                                SEARCH
                            </Text>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <Pressable >
                            <View style={styles.categories}>
                                <Text style={styles.textHeader}>CATEGORIES</Text>

                            </View>
                            <ArrowRight style={styles.arrow}></ArrowRight>

                        </Pressable>
                    </View>
                </View>

            </Animated.View>
            <View style={styles.scrollTopButton}>
                <Animated.View
                    style={{ transform: [{ scale: Platform.OS === 'web' ? 1 : scale }] }}>
                    <BottomButton scrollRef={scrollRef} />
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 16,
    },
    upButtonStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 70,
    },
    categories:{
        left:'21%',
        top:'47%'
    },
    scrollTopButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    header: {
        height: HEADER_HEIGHT,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#323232',
        flex:1,
         flexDirection:'row'
    },

    arrow: {
        position: 'absolute',
        top: '70%',
        left: '80%'
    },
    arrowL: {
        position: 'absolute',
        bottom: '30%',
        left: '45%'
    },
    textHeader: {
        color: '#fff',
        fontSize: 18,
    },
    searchInput: {
        position: 'absolute',
        flex: 1,
        fontSize: 18,
        color: 'white',
        left:'38%',
        top:'50%'

    },

});

function BottomButton({ scrollRef }) {
    const upButtonHandler = () => {
        scrollRef.current && scrollRef.current.scrollTo({ y: -HEADER_HEIGHT });
    };
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={upButtonHandler}
            style={styles.upButtonStyle}>
        </TouchableOpacity>
    );
}
