import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, Vibration, StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import RBSheet from "react-native-raw-bottom-sheet";
import * as color from '../styles/Colors';
import MainStyles from '../styles/MainStyles';
import * as Icon from 'react-native-vector-icons';

const QRScanner = () => {
    const refRBSheet = useRef();
    const [hasCameraPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [shopInfo, setShopInfo] = useState({name: '', pic: ''});
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
        setShopInfo({name: data, pic: ''}); // sample data
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
                <CancelButton/>
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
                onClose={() => setScanned(false)}
            >
                <ShopInfoCard shopInfo={shopInfo}/>
            </RBSheet>
        </View>
    )
};

const ShopInfoCard = ({shopInfo}) => {
    return (
        <TouchableOpacity style={{marginHorizontal: 20, height: 200, justifyContent: 'center'}}>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../assets/demoPic.png')}
                       style={{width: 75, height: 75, borderRadius: 5}}
                       resizeMode='cover'/>
            </View>
            <View style={{flex: 1.5, justifyContent: 'flex-start'}}>
                <Text numberOfLines={1} ellipsizeMode='tail'
                      style={[MainStyles.head2Text, {textAlign: 'center'}]}>{shopInfo.name}</Text>
                <Text style={[MainStyles.bodyText, {textAlign: 'center', fontSize: 15}]}>Press to Continue</Text>
            </View>
        </TouchableOpacity>
    )
};

const CancelButton = () => {
    return (
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon.AntDesign name={'closecircle'} size={30} color={'white'}/>
        </TouchableOpacity>
    )
};

export default QRScanner;