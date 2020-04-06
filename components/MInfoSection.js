import React from 'react';
import {Text, View} from 'react-native';
import MainStyles from "../styles/MainStyles";

const MInfoSection = ({title, value}) => {
    return (
        <View>
            <Text style={[MainStyles.head2Text]}>{title}</Text>
            <Text style={[MainStyles.head2Text, {
                fontFamily: 'proxima-regular',
                fontSize: 25,
                textAlign: 'left',
                justifyContent: 'center'
            }]}>{value}</Text>
        </View>
    );
};

export default MInfoSection;