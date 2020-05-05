import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, Vibration, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import RBSheet from "react-native-raw-bottom-sheet";
import * as color from '../styles/Colors';
import MainStyles from '../styles/MainStyles';
import * as Icon from 'react-native-vector-icons';
import TransparentButton from "../components/TransparentButton";
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import {connect} from 'react-redux';
import {BlurView} from 'expo-blur';

const TopUpP1 = ({navigation, User}) => {
    const refRBSheet = useRef();
    const [hasCameraPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [topUpInfo, setTopUpInfo] = useState({});
    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const handleBarCodeScanned = ({type, data}) => {
        Vibration.vibrate(500);
        setScanned(true);
        try {
            data = JSON.parse(data);
            console.log("Scanned: ", type);
            console.log(data);
            data = {
                cardId: data.cardId,
                number: data.number,
                value: data.value
            };
            setTopUpInfo(data);
            refRBSheet.current.open();
        } catch (error) {
            Alert.alert('Error');
        }
    };
    if (!hasCameraPermission) {
        return (
            <View style={{width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black'}}>
                <Text style={[MainStyles.bodyText, {color: 'white', textAlign: 'center'}]}>Please Allow Camera
                    Access</Text>
                <View style={{position: 'absolute', top: 30, left: 20}}>
                    <CancelButton/>
                </View>
            </View>
        )
    }
    return (
        <View style={{width: '100%', height: '100%'}}>
            <BarCodeScanner
                style={[StyleSheet.absoluteFill]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
            <View style={{position: 'absolute', top: 40, left: 20}}>
                <CancelButton navigation={navigation}/>
            </View>
            <BlurView intensity={100} tint={'dark'} style={{
                position: 'absolute',
                width: '100%',
                justifyContent: 'center',
                height: 50,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center'
            }}>
                <Text style={[MainStyles.bodyText, {textAlign: 'center'}]}>Scan QR code to top up</Text>
            </BlurView>
            <RBSheet
                ref={refRBSheet}
                animationType={'fade'}
                duration={200}
                height={320}
                closeOnDragDown={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    },
                    container: {
                        backgroundColor: color.background,
                    },
                    draggableIcon: {
                        backgroundColor: 'white'
                    }
                }}
                onClose={() => {
                    if (!confirm) setScanned(false);
                }}
            >
                <TopUpInfoCard topUpInfo={topUpInfo} navigation={navigation} refRBSheet={refRBSheet}
                               token={User.token} setConfirm={setConfirm} setScanned={setScanned}/>
            </RBSheet>
        </View>
    )
};

const TopUpInfoCard = ({navigation, refRBSheet, topUpInfo, token, setScanned}) => {
    const logo = require('../assets/logo.png');
    const gradient = require('../assets/13561.png');
    const TopUpCard = () => {
        return (
            <View style={{width: 86 * 3.25, height: 54 * 3.25, borderRadius: 7}}>
                <Image source={gradient} style={{
                    width: 86 * 3.25,
                    height: 54 * 3.25,
                    borderRadius: 7,
                    shadowOpacity: 0.4,
                    shadowRadius: 5
                }}/>
                <View style={{position: 'absolute'}}>
                    <Image source={logo} style={{width: 50, height: 50}}/>
                </View>
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={[MainStyles.head2Text, {
                        fontSize: 40,
                        color: 'white'
                    }]}>{topUpInfo.value} {'\u0E3F'}</Text>
                </View>
                <View style={{position: 'absolute', bottom: 7, left: 7}}>
                    <Text style={[MainStyles.bodyText, {fontSize: 12, color: 'white'}]}>No.</Text>
                    <Text style={[MainStyles.head2Text, {fontSize: 15, color: 'white'}]}>{topUpInfo.cardId}</Text>
                </View>
                <View style={{position: 'absolute', bottom: 7, right: 7}}>
                    <Text style={[MainStyles.bodyText, {fontSize: 12, color: 'white', textAlign: 'right'}]}>LOT</Text>
                    <Text style={[MainStyles.head2Text, {
                        fontSize: 15,
                        color: 'white',
                        textAlign: 'right'
                    }]}>{topUpInfo.number}</Text>
                </View>
            </View>

        )
    };
    const handleConfirmResult = () => {
        return new Promise(async (resolve) => {
            const tempData = {
                number: topUpInfo.number,
                value: topUpInfo.value,
            };
            console.log('tempData = ', tempData);
            await axios.post(API_URL.TOP_UP + '/' + topUpInfo.cardId, tempData, {'headers': {'Authorization': 'Bearer ' + token}})
                .then(async (res) => {
                    console.log(res);
                    await refRBSheet.current.close();
                    navigation.replace('TopUpComplete', {topUpValue: tempData.value});
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error', 'Please Try Again',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    setScanned(false);
                                }
                            }
                        ]);
                });
            resolve();
        });
    };
    return (
        <View
            style={{marginHorizontal: 20, height: 200, justifyContent: 'center'}}
        >
            <View style={{flex: 1.5, justifyContent: 'flex-start'}}>
                <Text style={[MainStyles.head2Text, {fontSize: 18}]}>
                    Top Up Card Information
                </Text>
                <View style={{alignItems: 'center', marginTop: 10}}>
                    <TopUpCard/>
                    <TransparentButton text={'Confirm & Top Up'} onPress={handleConfirmResult}
                                       style={{
                                           backgroundColor: 'rgb(38,115,226)',
                                           width: '100%',
                                           paddingHorizontal: 20
                                       }}/>
                </View>
            </View>
        </View>
    )
};

const CancelButton = ({navigation}) => {
    return (
        <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => {
                navigation.navigate('MainApp');
            }}
        >
            <Icon.AntDesign
                name={'closecircle'}
                size={25}
                color={'white'}
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,
                }}
            />
        </TouchableOpacity>
    )
};

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(TopUpP1);