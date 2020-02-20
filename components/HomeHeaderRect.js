import React from 'react';
import { View,Text } from 'react-native';
import * as colors from '../styles/Colors';

const HomeHeaderRect = ({name}) => {
    return (
        <View>
            <Text>
                Welcome, {name}.
            </Text>
        </View>
    );
};
export default HomeHeaderRect;