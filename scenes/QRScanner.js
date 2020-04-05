import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Icon from 'react-native-vector-icons';

const QRScanner = () => {
    const [hasCameraPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        console.log("Scanned: ", type, data);
        setScannedData(data);
    };
    if (!hasCameraPermission) {
        return (
            <View style={{width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'black'}}>
                <Text style={{color: 'white', textAlign: 'center'}}>Please Allow Camera Access</Text>
            </View>
        )
    }
    return (
        <View style={{width: '100%', height: '100%'}}>
            <BarCodeScanner
                style={{position: 'absolute', width: '100%', height: '100%'}}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />

        </View>
    )
};

export default QRScanner;