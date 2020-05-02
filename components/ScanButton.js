import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import * as colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from 'react-navigation';

const ScanButton = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity style={{
                width: 90,
                height: 90,
                borderRadius: 60,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'white',
                borderWidth: 3,
                top: -15,
                shadowRadius: 20,
                shadowColor: 'black',
                shadowOpacity: 0.5,
            }}
            onPress= {()=>{
                console.log('scan');
                navigation.navigate('QRScanner');
            }}>
                <Icon name='qrcode' size={40} color='white'/>
            </TouchableOpacity>
        </View>
    );
};

export default withNavigation(ScanButton);