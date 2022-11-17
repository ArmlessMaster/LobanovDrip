import {Dimensions, ScrollView, Image, StyleSheet, View} from "react-native";
import {useState} from "react";
import React from "react";
import Dot from '../../assets/images/GreyDot.svg'
import RedDot from "../../assets/images/RedDot.svg"
import SafeAreaView, {SafeAreaProvider} from "react-native-safe-area-view";


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


const Carousel = ({images}) => {

    function showImage(index, e) {
        return (
            <Image key={index}  source={{uri: e}} style={styles.wrap}/>)
    }

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
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.wrap}>
                    <ScrollView  scrollEventThrottle={0} onScroll={({nativeEvent}) => onchange(nativeEvent)}
                                 showsHorizontalScrollIndicator={false}
                                 pagingEnabled={true}
                                 horizontal={true}>
                        {
                            images.map((e, index) => showImage(index, e))
                        }

                    </ScrollView>
                </View>
                <View style={{bottom: '8%', flexDirection: 'row', justifyContent: 'center'}}>
                    {
                        images.map((e, index) =>
                            imgActive === index ? dotActivated(index): dot(index))
                    }
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

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
    dot: {
        marginHorizontal: 5
    }
})

export default Carousel