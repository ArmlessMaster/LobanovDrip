import Footer from "../footer"
import { Text, View, StyleSheet, Dimensions} from "react-native";
import React from "react";
import Swiper from "react-native-swiper"
import StoreScreen from "./StoreScreen";
import SelectCategory from "../categories/SelectCategory";
import Search from "../search/Search";


export default function SwipeStore({navigation}) {

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 10.5}}>
                <Swiper
                    index={1}
                    showsPagination={false}
                    showsButtons={true}
                    loop={false}
                    prevButton={<View style={{opacity: 0}}>
                        <View style={styles.prev}>
                            <Text>prev prev prev prev pr </Text>
                            <Text>prev prev prev prev pr </Text>
                            <Text>prev prev prev prev pr </Text>
                        </View>
                    </View>}
                    nextButton={<View style={{opacity: 0}}>
                        <View style={styles.next}>
                            <Text>next next next next next </Text>
                            <Text>next next next next next </Text>
                            <Text>next next next next next </Text>
                        </View>
                    </View>}>
                    <Search navigation={navigation}/>
                    <StoreScreen navigation={navigation}/>
                    <SelectCategory navigation={navigation}/>
                </Swiper>
            </View>
            <Footer navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    prev:{
        position: "absolute",
        bottom: Dimensions.get('screen').height/100*35,
    },
    next:{
        position: "absolute",
        bottom: Dimensions.get('screen').height/100*35,
        right: Dimensions.get('screen').width/100
    },
})