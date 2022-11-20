import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput, ScrollView,
} from "react-native";
import React from "react";
import WhiteText from '../../assets/images/WhiteTextMyAccount.svg'
import Scull from '../../assets/images/scull.svg'
import HeaderText from '../../assets/images/SmallText.svg'
import Arrow from '../../assets/images/ArrowLeft.svg'

export default function PersonalInfo({navigation}) {
    return(
        <View style={{flex:1}}>

            <View style={{flex: 0.5, backgroundColor: '#000'}}/>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.navigate('MyAccount')}>
                    <Arrow  style={{ paddingRight:'10%'}}/>
                    <Text style={{color:'#fff', fontFamily: "VCR_OSD_MONO", fontSize:17, paddingRight:'5%'}}>BACK</Text>

                </Pressable>
            </View>
            <View style={styles.main}>
                <ScrollView style={{flex :1}}>
                    <View style={styles.mainHeader}>
                        <View style={{ flex:1,justifyContent: 'center', paddingLeft:'3%', paddingTop:'2%'}}><Scull/></View>
                        <View style={{ flex:1 ,justifyContent: 'center', alignItems: 'flex-end', paddingTop:'2%', paddingRight: '3%'}}><HeaderText/></View>
                    </View>
                    <View style={{flex:1,  justifyContent:'center', alignItems:'center', paddingTop:'5%'}}>
                        <Text style={styles.headerText}>PERSONAL INFO</Text>
                    </View>
                    <View style={{flex:0.5, justifyContent:'center', alignItems:'center', paddingTop:'4%'}}>
                        <Text style={styles.tapToChange}>TAP TO CHANGE</Text>
                    </View>
                    <Text style={styles.textInfo}>NAME</Text>
                    <View style={styles.greyBotton}>

                        <Pressable style={{backgroundColor:'#1F1F1F', width:'70%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>NAME</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.textInfo}>SURNAME</Text>
                    <View style={styles.greyBotton}>

                        <Pressable style={{backgroundColor:'#1F1F1F', width:'70%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>SURNAME</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.textInfo}>PATRONYMIC</Text>
                    <View style={styles.greyBotton}>

                        <Pressable style={{backgroundColor:'#1F1F1F', width:'70%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>PATRONYMIC</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.textInfo}>PHONE</Text>
                    <View style={styles.greyBotton}>

                        <Pressable style={{backgroundColor:'#1F1F1F', width:'70%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>PHONE</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.textInfo}>EMAIL</Text>
                    <View style={styles.greyBotton}>

                        <Pressable style={{backgroundColor:'#1F1F1F', width:'70%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>EMAIL</Text>
                        </Pressable>
                    </View>
                    <View style={styles.redBotton}>

                        <Pressable style={{backgroundColor:'#DB2525', width:'50%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>CHANGE</Text>
                        </Pressable>
                    </View>


                    <View style={{flex:1,  justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.headerText}>DELIVERY ADRESS</Text>
                    </View>
                    <View style={{flex:0.5, justifyContent:'center', alignItems:'center', paddingTop:'4%'}}>
                        <Text style={styles.tapToChange}>TAP TO CHANGE</Text>
                    </View>

                    <Text style={styles.textInfo}>REGION</Text>
                    <View style={styles.greyBotton}>

                        <Pressable style={{backgroundColor:'#1F1F1F', width:'70%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>REGION</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.textInfo}>CITY / VILLAGE</Text>
                    <View style={styles.greyBotton}>

                        <Pressable style={{backgroundColor:'#1F1F1F', width:'70%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>CITY / VILLAGE</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.textInfo}>NOVAPOSHTA DEPART</Text>
                    <View style={styles.greyBotton}>

                        <Pressable style={{backgroundColor:'#1F1F1F', width:'70%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                            <Text style={styles.greyBottonText}>NOVAPOSHTA DEPART</Text>
                        </Pressable>
                    </View>

                    <View style={{flexDirection:'row', flex:10}}>
                        <View style={{flex:0.1, justifyContent:'flex-start', paddingBottom: '5%', paddingLeft: '2%'}}>
                            <WhiteText/>

                        </View>
                        <View style={styles.redBotton2}>

                            <Pressable style={{backgroundColor:'#DB2525', width:'65%', height:'200%', justifyContent:'center', alignItems: 'center'}}>
                                <Text style={styles.greyBottonText}>CHANGE</Text>
                            </Pressable>
                        </View>

                    </View>




                </ScrollView>

            </View>
            <View style={{flex: 1, backgroundColor:'#000'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'flex-end'

    },
    main:{
        flex:11,
        backgroundColor:'#0D0D0D'
    },

    mainHeader:{
        flexDirection: 'row',
        flex:1,

    },
    bigText:{
        flex: 1, justifyContent:'center', alignItems:' center'
    },
    headerText:{
        color:'#fff',
        fontSize: 40,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},


    },
    tapToChange:{
        color:'#609FFF',
        fontSize: 17,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},


    },
    greyBotton:{
        flex: 1,
        alignItems:"center",
        justifyContent:'center',
        paddingTop: '3%'

    },
    redBotton:{
        flex: 1,
        alignItems:"center",
        justifyContent:'center',
        paddingTop: '15%',
        paddingBottom:'20%'
    },
    redBotton2:{
        flex: 1,
        alignItems:"center",
        justifyContent:'center',
        paddingTop: '15%',
        paddingBottom:'20%',
        paddingRight:'10%'
    },
    greyBottonText:{
        color:'#fff',
        fontSize: 22,
        fontFamily: "VCR_OSD_MONO",
        shadowColor: 'rgba(0, 0, 0, 0.55)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
    },
    textInfo:{
        fontFamily:'roboto-regular',
        paddingTop:'5%',
        color:'#585858',
        paddingLeft:'15%'
    },

})
