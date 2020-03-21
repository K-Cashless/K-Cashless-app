import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const RedeemButton = ({navigation}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                width: '50%',
                height: 50,
                justifyContent: 'center',
                borderRadius: 3,
            }}
            onPress={() => {
                navigation.navigate('RedeemPoint');
            }}
        >
            <Text style={{
                fontFamily: 'proxima-bold',
                fontSize: 18,
                alignSelf: 'center',
            }}>Redeem Points</Text>
        </TouchableOpacity>
    );
};

export default RedeemButton;