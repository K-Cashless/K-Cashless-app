import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import * as colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ScanButton = () => {
    return(
        <View>
            <TouchableHighlight style={{
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
            </TouchableHighlight>
        </View>
    )
}

export default ScanButton;