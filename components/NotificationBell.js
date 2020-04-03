import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import * as Icon from 'react-native-vector-icons';
import store from '../store';
import * as action from '../actions';
import {connect} from 'react-redux';

const NotificationBell = ({navigation, haveUnread}) => {
    console.log(haveUnread);
    return (
        <TouchableOpacity onPress={() => {
            store.dispatch(action.User.setNotificationsUnread(false));
            navigation.navigate('NotificationView');
        }}>
            <Icon.FontAwesome5 name={'bell'} size={25} color={'white'}/>
            {
                (haveUnread) ? (
                    <View style={{
                        position: 'absolute',
                        width: 10,
                        height: 10,
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

function mapStateToProps(state) {
    return {
        haveUnread: state.User.notifications.haveUnread,
    }
}

export default connect(mapStateToProps)(NotificationBell);