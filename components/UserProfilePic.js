import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

const UserProfilePic = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Profile');
                }}>
                <Image source={require('../assets/demoPic.png')} style={{width: 40, height: 40, borderRadius: 40}}
                       resizeMode='cover'/>
            </TouchableOpacity>
        </View>
    );
};

export default UserProfilePic;