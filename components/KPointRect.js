import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../styles/Colors';
import RedeemButton from './RedeemButton';

const KPointRect = ({point}) => {
    return (
        <View>
            <View style={{
                backgroundColor: colors.primary,
                width: '100%',
                height: 130,
                padding: 20,
                borderRadius: 5,
                justifyContent: 'center',
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: 'proxima-extrabold',
                    fontSize: 24,
                    color: 'white',
                    textAlign: 'left',
                }}>K Point Balance</Text>
                <Text style={{
                    fontFamily: 'proxima-bold',
                    fontSize: 36,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'right',
                }}>{point}</Text>
                <Text style={{
                    fontFamily: 'proxima-bold',
                    fontSize: 16,
                    color: 'white',
                    textAlign: 'right',
                }}>Points</Text>
            </View>
            <View style={{
                position: 'absolute',
                alignSelf: 'center',
                top: 105,
                width: '100%',
                alignItems: 'center',
            }}>
                <RedeemButton/>
            </View>
        </View>
    )
};
export default KPointRect;