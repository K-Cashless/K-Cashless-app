import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, Vibration, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import RBSheet from "react-native-raw-bottom-sheet";
import * as color from '../styles/Colors';
import MainStyles from '../styles/MainStyles';
import * as Icon from 'react-native-vector-icons';
import API_URL from '../firebase/apiLinks';
import {connect} from 'react-redux';
import axios from 'axios';
import {BlurView} from 'expo-blur';

const QRScanner = ({navigation, User}) => {
    const refRBSheet = useRef();
    const [hasCameraPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [shopInfo, setShopInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [confirmResult, setConfirmResult] = useState(false);
    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const handleBarCodeScanned = ({type, data}) => {
        Vibration.vibrate(500);
        setScanned(true);
        setIsLoading(true);
        console.log("Scanned: ", type, data, API_URL.GET_MERCHANT_DATA + '/' + data);
        axios.get(API_URL.GET_MERCHANT_DATA + '/' + data, {'headers': {'Authorization': 'Bearer ' + User.token}})
            .then(res => {
                console.log(res.data[0]);
                setShopInfo({
                    id: res.data[0].handle,
                    name: res.data[0].storeName,
                    pic: res.data[0].imageUrl
                });
                setIsLoading(false);
                refRBSheet.current.open();
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                Alert.alert('Error Trying to Fetch Information', 'Please Try Again',
                    [
                        {
                            text: 'OK', onPress: () => {
                                setScanned(false);
                            }
                        }
                    ]);
            });
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
            <View style={{position: 'absolute', top: 30, left: 20}}>
                <CancelButton navigation={navigation}/>
            </View>
            <BlurView intensity={100} tint={'dark'} style={{
                position: 'absolute',
                width: '100%',
                justifyContent: 'center',
                height: 70,
                bottom: 0,
                alignItems: 'center'
            }}>
                <Text style={[MainStyles.bodyText, {textAlign: 'center', color: isLoading ? color.blue : 'white'}]}>
                    {isLoading ? ('Loading... Please Wait') : ('Scan QR code to pay')}
                </Text>
            </BlurView>
            <RBSheet
                ref={refRBSheet}
                animationType={'fade'}
                duration={200}
                height={200}
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
                    if (!confirmResult) setScanned(false);
                }}
            >
                <ShopInfoCard shopInfo={shopInfo} navigation={navigation} refRBSheet={refRBSheet}
                              setConfirmResult={setConfirmResult}/>
            </RBSheet>
        </View>
    )
};

const ShopInfoCard = ({navigation, refRBSheet, shopInfo, setConfirmResult}) => {
    const handleConfirmResult = async () => {
        await setConfirmResult(true);
        refRBSheet.current.close();
        navigation.replace('PaymentInfo', {shopInfo: shopInfo});
    };

    return (
        <TouchableOpacity
            style={{marginHorizontal: 20, height: 200, justifyContent: 'center'}}
            onPress={handleConfirmResult}
        >
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: shopInfo.pic}}
                       style={{width: 75, height: 75, borderRadius: 75}}
                       resizeMode='cover'/>
            </View>
            <View style={{flex: 1.5, justifyContent: 'flex-start'}}>
                <Text numberOfLines={1} ellipsizeMode='tail'
                      style={[MainStyles.head2Text, {textAlign: 'center'}]}>{shopInfo.name}</Text>
                <Text style={[MainStyles.bodyText, {textAlign: 'center', fontSize: 15}]}>Tab to Continue</Text>
            </View>
        </TouchableOpacity>
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
            <BlurView intensity={100}
                      style={{width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Icon.AntDesign
                    name={'close'}
                    size={25}
                    color={'rgba(255,255,255,0.7)'}
                    style={{}}
                />
            </BlurView>
        </TouchableOpacity>
    )
};

function mapStateToProps(state) {
    return {
        User: state.User
    };
}

export default connect(mapStateToProps)(QRScanner);