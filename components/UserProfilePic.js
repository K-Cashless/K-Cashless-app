import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

const UserProfilePic = ({navigation}) => {
    const [cnt, setCnt] = useState(0);
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    console.log("PRESS" + cnt);
                    setCnt(cnt + 1);
                    navigation.navigate('SignIn');
                }}>
                <Image source={require('../assets/demoPic.png')} style={{width: 40, height: 40, borderRadius: 40}}
                       resizeMode='cover'/>
            </TouchableOpacity>
        </View>
    );
};

export default UserProfilePic;