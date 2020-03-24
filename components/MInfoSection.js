import React from 'react';
import {View, Text} from 'react-native';
import MainStyles from "../styles/MainStyles";

const MInfoSectionTHB = ({title, value}) => {
    return (
        <View>
            <Text style={[MainStyles.head2Text]}>{title}</Text>
            <Text style={[MainStyles.head2Text, {
                fontFamily: 'proxima-regular',
                fontSize: 30,
                textAlign: 'left',
                justifyContent: 'center'
            }]}>{value}</Text>
        </View>
    );
};

export default MInfoSectionTHB;