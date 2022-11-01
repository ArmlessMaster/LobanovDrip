import {Dimensions, SafeAreaView, ScrollView, Image, StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import React from "react";
import Dot from '../../assets/images/GreyDot.svg'
import RedDot from "../../assets/images/RedDot.svg"

const images = [
    require('../../assets/images/lobanovDripProducts/1.jpg'),
    require('../../assets/images/lobanovDripProducts/4.jpg'),
    require('../../assets/images/lobanovDripProducts/3.png'),
    require('../../assets/images/lobanovDripProducts/2.png'),
    require('../../assets/images/lobanovDripProducts/6.jpg'),

]

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function dotActivated(index) {
    return (
        <RedDot key={index} style={styles.dot}></RedDot>
    )
}

function dot(index) {
    return (
        <Dot key={index} style={styles.dot}></Dot>
    )
}

function showImage(index, e) {
    return (
        <Image key={index} resizeMode='cover' source={e} style={styles.wrap}/>)
}

const Carousel = () => {
    const [imgActive, setimgActive] = useState(0)

    const onchange = (nativeEvent) => {
        if(nativeEvent) {
            const slide = Math.floor(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide !== imgActive) {
                setimgActive(slide);
            }
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.wrap}>
                <ScrollView scrollEventThrottle={0} onScroll={({nativeEvent}) => onchange(nativeEvent)}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            horizontal={true}
                            >
                    {
                        images.map((e, index) => showImage(index, e))
                    }

                </ScrollView>
            </View>
            <View style={{bottom: '5%', flexDirection: 'row', justifyContent: 'center'}}>
                {
                    images.map((e, index) =>
                        imgActive === index ? dotActivated(index): dot(index))
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.5,

    },
    wrapDot: {
        position: 'absolute',
        top: 500,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        marginHorizontal: 5
    }
})

export default Carousel