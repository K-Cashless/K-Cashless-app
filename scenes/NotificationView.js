import React, {useState, useEffect} from 'react';
import {Dimensions, RefreshControl, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import * as color from '../styles/Colors';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import store from '../store';
import * as actions from '../actions';
import {connect} from 'react-redux';

let test = 0;

async function NotificationLoader() {
    let i;
    test += 1;
    test %= 2;
    let list = [];
    for (i = 0; i < 10 * test; ++i) {
        list.push({
            id: i.toString(),
            time: '1/2/2020 10:00 AM',
            title: 'This is title ' + i,
            description: 'This is description',
        });
    }
    store.dispatch(actions.User.setNotificationsList(list));
    console.log(list);
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const NotificationView = ({navigation, list}) => {
    useEffect(() => {
        store.dispatch(actions.User.setNotificationsUnread(false));
    });
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
        NotificationLoader().then(() => wait(3000)).then(() => setRefreshing(false));
    };

    const renderItem = data => (
        <View style={{
            width: '100%',
            paddingVertical: 10,
            borderColor: 'rgb(100,100,100)',
            backgroundColor: color.background,
            borderTopWidth: 0,
            borderBottomWidth: 1
        }}>
            <Text style={{
                fontFamily: 'proxima-regular',
                marginLeft: 60,
                marginRight: 20,
                color: 'rgb(150,150,150)',
                fontSize: 12
            }}>{data.item.time}</Text>
            <Text style={{
                fontFamily: 'proxima-regular',
                marginTop: 5,
                marginLeft: 60,
                marginRight: 20,
                color: 'white',
                fontSize: 25
            }}>{data.item.title}</Text>
            <Text style={{
                fontFamily: 'proxima-regular',
                marginLeft: 60,
                marginRight: 20,
                color: 'rgb(150,150,150)',
                fontSize: 16
            }}>{data.item.description}</Text>
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