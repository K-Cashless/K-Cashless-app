import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import * as Icon from 'react-native-vector-icons';
import store from '../store';

const NotificationBell = ({navigation}) => {
    const state = store.getState();
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('NotificationView')
        }}>
            <Icon.FontAwesome5 name={'bell'} size={25} color={'white'}/>
            {
                (state.User.notifications.haveUnread) ? (
                    <View style={{
                        position: 'absolute',
                        width: 13,
                        height: 13,
                        borderRadius: 15,
                        backgroundColor: 'red',
                        right: -5,
                        top: -2
                    }}/>
                ) : null
            }

        </TouchableOpacity>
    );
};

export default NotificationBell;