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
            borderRadius: 10,
            justifyContent: 'flex-start'
        }}>
            <Text style={{
                flex: 1,
                fontSize: 24,
                fontWeight: 'bold',
                color:'white',
                textAlign: 'left',
            }}>K Point Balance</Text>
            <Text style={{
                fontSize: 36,
                fontWeight: 'bold',
                color:'white',
                textAlign: 'right',
            }}>{point}</Text>
            <Text style={{
                fontSize: 14,
                color:'white',
                textAlign: 'right',
            }}>POINTS</Text>
        </View>
    )
};
export default KPointRect;