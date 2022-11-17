import React from 'react';
import { View, Pressable, StyleSheet, Text, Dimensions} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';


export default function ChooseGender() {
    const offset = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value}],
        };
    });
    return(

        <View style={styles.chooseGender}>
            <View style={{ flex:0.8, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Pressable onPress={() => {
                    offset.value = withSpring(0);}}>
                    <Text style={{fontSize: 17,fontFamily: 'roboto-regular', fontWeight: '500'}}>FOR
                        MAN</Text>
                </Pressable>
                <Pressable onPress={() => {
                    offset.value = withSpring(Dimensions.get('window').width / 2);
                }}>
                    <Text style={{fontSize: 17, fontFamily: 'roboto-regular', fontWeight: '500'}}>FOR
                        WOMAN</Text>
                </Pressable>
            </View>
            <Animated.View style={[{
                height: 3,
                width: Dimensions.get('window').width / 2,
                justifyContent: 'center',
                backgroundColor: '#000'
            }, animatedStyles]}></Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({

    chooseGender:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    }
});
