import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {SwitchActions} from 'react-navigation';


const UserProfilePic = ({navigation}) => {
    const [cnt, setCnt] = useState(0);
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    console.log("PRESS" + cnt);
                    setCnt(cnt + 1);
                    const routeName = 'Auth';
                    navigation.dispatch(SwitchActions.jumpTo({routeName}));
                }}>
                <Image source={require('../assets/demoPic.png')} style={{width: 40, height: 40, borderRadius: 40}}
                       resizeMode='cover'/>
                {(cnt % 2 == 0) ? (
                    <View style={{
                        position: 'absolute',
                        width: 15,
                        height: 15,
                        borderRadius: 15,
                        backgroundColor: 'red',
                        right: -2,
                        top: -3
                    }}/>
                ) : null}
            </TouchableOpacity>
        </View>
    );
};

export default UserProfilePic;