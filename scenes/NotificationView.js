import React, {useEffect, useState} from 'react';
import {Dimensions, RefreshControl, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import * as color from '../styles/Colors';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import store from '../store';
import * as actions from '../actions';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

// let test = 0;

async function NotificationLoader() {
    // let i;
    // test += 1;
    // test %= 2;
    // let list = [];
    // for (i = 0; i < 10 * test; ++i) {
    //     list.push({
    //         id: i.toString(),
    //         time: '1/2/2020 10:00 AM',
    //         title: 'This is title ' + i,
    //         description: 'This is description',
    //     });
    // }
    // store.dispatch(actions.User.setNotificationsList(list));
    // console.log(list);
}

// function wait(timeout) {
//     return new Promise(resolve => {
//         setTimeout(resolve, timeout);
//     });
// }

const NotificationView = ({navigation, list}) => {
    useEffect(() => {
        store.dispatch(actions.User.setNotificationsUnread(false));
    }, [store.getState().User.notifications.list]);
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, top: '5%', height: '95%'}}>
                <SubScreenHeader navigation={navigation} title={'Notifications'} backButton={true}/>
            </View>
            <NotificationList list={list}/>
        </View>
    )
};


const NotificationList = ({list}) => {
    const [refreshing, setRefreshing] = useState(false);

    const ListEmptyComponent = () => {
        return (
            <View style={{height: Dimensions.get('window').height / 4, justifyContent: 'flex-end'}}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'rgb(150,150,150)',
                        fontFamily: 'proxima-regular',
                        fontSize: 25
                    }}>
                    No Notifications
                </Text>
            </View>
        )
    };

    const onRefresh = async () => {
        setRefreshing(true);
        NotificationLoader().then(() => setRefreshing(false));
    };

    const renderItem = data => (
        <View style={{backgroundColor: color.background}}>
            <Animatable.View animation={data.item.read ? null : 'bounceIn'} duration={1000} delay={100}
                             onAnimationEnd={() => data.item.read = true}>
                <View style={{
                    width: '100%',
                    paddingVertical: 10,
                    borderColor: 'rgb(100,100,100)',
                    backgroundColor: data.item.read ? color.background : color.blue,
                    borderTopWidth: 0,
                    borderBottomWidth: 1
                }}>
                    <Text style={{
                        marginLeft: 60,
                        marginRight: 20,
                        fontFamily: 'proxima-bold',
                        color: 'white',
                        fontSize: 18,
                    }}>{data.item.title}</Text>
                    <Text style={{
                        fontFamily: 'proxima-regular',
                        marginLeft: 60,
                        marginRight: 20,
                        color: 'rgb(200,200,200)',
                        fontSize: 16
                    }}>{data.item.body}</Text>
                </View>
            </Animatable.View>
        </View>

    );

    const renderHiddenItem = (data) => {
        const deleteItemById = id => {
            let list = store.getState().User.notifications.list;
            list = list.filter(item => item.id !== id);
            store.dispatch(actions.User.setNotificationsList(list));
        };
        return (
            <TouchableOpacity
                style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'red'}}
                onPress={() => deleteItemById(data.item.id)}
            >
                <View style={{
                    position: 'absolute',
                    right: 0,
                    width: 100,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon name={'trash'} color={'white'} size={24}/>
                    <Text style={{
                        paddingTop: 5,
                        fontFamily: 'proxima-bold',
                        color: 'white',
                        fontSize: 15,
                    }}>
                        Delete
                    </Text>
                </View>
            </TouchableOpacity>
        )

    };

    return (
        <SafeAreaView style={{position: 'absolute', top: '13%', height: '87%', width: '100%'}}>
            <SwipeListView
                data={list}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        tintColor='white'
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={ListEmptyComponent}
                disableRightSwipe={true}
                rightOpenValue={-100}
                rightActivationValue={-50}
                recalculateHiddenLayout={true}
            />
        </SafeAreaView>
    );
};

function mapStateToProps(state) {
    return {
        list: state.User.notifications.list
    }
}

export default connect(mapStateToProps)(NotificationView);