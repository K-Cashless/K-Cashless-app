import React from 'react';
import {Text, View} from 'react-native';
import MainStyles from "../styles/MainStyles";
import UserProfilePic from "./UserProfilePic";
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
                <View style={{margin: 15}}>
                    <NotificationBell navigation={navigation}/>
                </View>
                <UserProfilePic navigation={navigation}/>
            </View>
        </View>
    );
};

export default HomeHeader;