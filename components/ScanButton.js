import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ScanButton = () => {
    return(
        <View>
            <TouchableOpacity style={{
                width: 80,
                height: 80,
                borderRadius: 60,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent:'center',
            }}
            onPress= {()=>{
                console.log('scan');
            }}>
                <Icon name='qrcode' size={35} color='white'/>
            </TouchableOpacity>
        </View>
    );
};

export default ScanButton;