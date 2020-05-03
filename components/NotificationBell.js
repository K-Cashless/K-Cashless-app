import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import * as Icon from 'react-native-vector-icons';
import store from '../store';
import * as action from '../actions';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

const NotificationBell = ({navigation, haveUnread, animationSignal}) => {
    console.log(haveUnread);
    const enlargeForAttention = {
        0: {
            scale: 1,
        },
        0.5: {
            scale: 1.25,
        },
        1: {
            scale: 1,
        },
    };
    return (
        <Animatable.View animation={animationSignal ? 'swing' : null} duration={500}>
            <Animatable.View animation={animationSignal ? enlargeForAttention : null} duration={500}>
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
            </Animatable.View>
        </Animatable.View>

    );
};

function mapStateToProps(state) {
    return {
        haveUnread: state.User.notifications.haveUnread,
        animationSignal: state.User.notifications.animationSignal
    }
}

export default connect(mapStateToProps)(NotificationBell);