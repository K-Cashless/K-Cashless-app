import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../styles/Colors';
import * as Icon from 'react-native-vector-icons';
import MainStyles from "../styles/MainStyles";
import UserProfilePic from "./UserProfilePic";

const HomeHeader = ({navigation, name, balance}) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Text style={MainStyles.mainAppHeaderLabel}>
                KCashless
            </Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                right: 0,
            }}>
                <Text style={{
                    fontFamily: 'proxima-bold',
                    fontSize: 16,
                    color: 'white',
                    right: 10,
                    textAlign: 'right'
                }}>{'\u0E3F'} {balance}</Text>
                <UserProfilePic navigation={navigation}/>
            </View>
        </View>
    );
};

export default HomeHeader;