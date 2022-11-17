import Footer from "../footer"
import { Text, View, StyleSheet, Dimensions} from "react-native";
import React from "react";
import Registration from "./RegistrationScreen";
import Login from "./LoginScreen"
import Swiper from "react-native-swiper"
import LeftArrow from "../../assets/images/login/Arrow 4.svg";
import Arrow from "../../assets/images/Arrow 4.svg";

export default function Authorization({navigation}) {

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 10.5}}>
                <Swiper
                    showsPagination={false}
                    showsButtons={true}
                    loop={false}
                    prevButton={<View style={{opacity: 0}}>
                        <Arrow style={styles.prevArrow}></Arrow>
                        <Text style={styles.loginText}>LOGIN-IN</Text>
                    </View>}
                    nextButton={<View style={{opacity: 0}}><Text style={styles.signIn}>SIGN-IN</Text><LeftArrow style={styles.arrow}/>
                </View>}>
                    <Login navigation={navigation}/>
                    <Registration navigation={navigation}/>
                </Swiper>
            </View>
            <Footer navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    signIn: {
        color: 'white',
        fontFamily: 'VCR_OSD_MONO',
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        bottom: Dimensions.get('screen').height/100*38,
        right: Dimensions.get('screen').width/100*12,
        shadowOpacity: 1,
    },
    prevArrow: {
        position: "absolute",
        bottom: Dimensions.get('screen').height/100*38,
        left: Dimensions.get('screen').width/100*64,
        opacity: 1
    },
    arrow: {
        position: "absolute",
        bottom: Dimensions.get('screen').height/100*38,
        left: Dimensions.get('screen').width/100*10,
        opacity: 1
    },
    loginText: {
        bottom: Dimensions.get('screen').height/100*38,
        left: Dimensions.get('screen').width/100*74,
        color: 'white', fontSize: 18, fontFamily: 'VCR_OSD_MONO'
    },
})