import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, Vibration, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import RBSheet from "react-native-raw-bottom-sheet";
import * as color from '../styles/Colors';
import MainStyles from '../styles/MainStyles';
import * as Icon from 'react-native-vector-icons';

const QRScanner = ({navigation}) => {
    const refRBSheet = useRef();
    const [hasCameraPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [shopInfo, setShopInfo] = useState({});
    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const handleBarCodeScanned = ({type, data}) => {
        Vibration.vibrate(500);
        setScanned(true);
        console.log("Scanned: ", type, data);
        // TODO - fetch shop data from firebase
        setShopInfo({
            id: '12345',
            name: data,
            location: 'Building ABC',
            pic: ''
        }); // sample data
        refRBSheet.current.open();
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
            <View style={{
                position: 'absolute',
                width: '100%',
                justifyContent: 'center',
                height: 50,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center'
            }}>
                <Text style={[MainStyles.bodyText, {textAlign: 'center'}]}>Scan QR code to pay</Text>
            </View>
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
                    setScanned(false);
                }}
            >
                <ShopInfoCard shopInfo={shopInfo} navigation={navigation} refRBSheet={refRBSheet}/>
            </RBSheet>
        </View>
    )
};

const ShopInfoCard = ({navigation, refRBSheet, shopInfo}) => {
    const handleConfirmResult = async () => {
        refRBSheet.current.close();
        navigation.replace('PaymentInfo', {shopInfo: shopInfo});
    };
    return (
        <TouchableOpacity
            style={{marginHorizontal: 20, height: 200, justifyContent: 'center'}}
            onPress={handleConfirmResult}
        >
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                {/*sample data*/}
                <Image source={require('../assets/demoPic.png')}
                       style={{width: 75, height: 75, borderRadius: 5}}
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
                navigation.replace('MainApp');
            }}
        >
            <Icon.AntDesign
                name={'closecircle'}
                size={30}
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

export default QRScanner;