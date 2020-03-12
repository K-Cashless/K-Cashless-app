import React from 'react';
import { View, Text} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {GetStartButton} from '../components';

export default function GetStarted({ navigation }) {
    return (
        <View style={MainStyles.container}>
            <View style={{ marginHorizontal: 20 ,height:'100%',alignItems:'center',justifyContent:'center'}}>
                <Text style={[MainStyles.head1Text]}>KMITL CASHLESS</Text>
                <Text style={[MainStyles.bodyText]}>Cashless Society for Everyone!</Text>
                <GetStartButton navigation={navigation} />
            </View>
        </View>
    );
}