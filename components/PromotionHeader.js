import React from 'react';
import {View, Text} from 'react-native';
import MainStyles from "../styles/MainStyles";

const HomeHeader = ({name, balance}) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Text style={MainStyles.mainAppHeaderLabel}>
                Promotions
            </Text>
        </View>
    );
};

export default HomeHeader;