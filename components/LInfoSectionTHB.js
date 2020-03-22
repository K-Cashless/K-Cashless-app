import React from 'react';
import {View, Text} from 'react-native';
import MainStyles from "../styles/MainStyles";

const LInfoSectionTHB = ({title, value}) => {
    return (
        <View>
            <Text style={[MainStyles.head2Text]}>{title}</Text>
            <Text style={[MainStyles.head2Text, {
                fontSize: 50,
                textAlign: 'right',
                justifyContent: 'center'
            }]}>{value} <Text style={{fontSize: 30}}>{'\u0E3F'}</Text></Text>
        </View>
    );
};

export default LInfoSectionTHB;