import React from 'react';
import {Text, View} from 'react-native';
import MainStyles from "../styles/MainStyles";

const PromotionHeader = ({setLayout}) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}
              onLayout={(event) => {
                  const {x, y, width, height} = event.nativeEvent.layout;
                  setLayout({x, y, width, height});
              }}
        >
            <Text style={MainStyles.mainAppHeaderLabel}>
                Promotions
            </Text>
        </View>
    );
};

export default PromotionHeader;