import React from 'react';
import {Text, View} from 'react-native';
import MainStyles from "../styles/MainStyles";
import NotificationBell from "./NotificationBell";

const HomeHeader = ({navigation}) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Text style={MainStyles.mainAppHeaderLabel}>
                K-Cashless
            </Text>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                right: 0,
            }}>
                <View>
                    <NotificationBell navigation={navigation}/>
                </View>
            </View>
        </View>
    );
};

export default HomeHeader;