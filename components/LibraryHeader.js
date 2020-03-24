import React from 'react';
import {View, Text} from 'react-native';
import MainStyles from "../styles/MainStyles";

const LibraryHeader = () => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Text style={MainStyles.mainAppHeaderLabel}>
                KMITL Central Library
            </Text>
        </View>
    );
};

export default LibraryHeader;