import React from 'react';
import { View,Text } from 'react-native';
import * as colors from '../styles/Colors';

const KPointRect = ({point}) => {
    return (
        <View style={{
            backgroundColor: colors.primary,
            width: '100%',
            height: 130,
            padding: 20,
            borderRadius: 3,
            justifyContent: 'flex-start'
        }}>
            <Text style={{
                flex: 1,
                fontFamily: 'proxima-bold',
                fontSize: 24,
                color:'white',
                textAlign: 'left',
            }}>K Point Balance</Text>
            <Text style={{
                fontFamily: 'proxima-bold',
                fontSize: 36,
                fontWeight: 'bold',
                color:'white',
                textAlign: 'right',
            }}>{point}</Text>
            <Text style={{
                fontFamily: 'proxima-regular',
                fontSize: 14,
                color:'white',
                textAlign: 'right',
            }}>Points</Text>
        </View>
    )
};
export default KPointRect;