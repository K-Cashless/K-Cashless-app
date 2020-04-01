import React, {useState} from 'react';
import {Dimensions, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import {UserStore} from '../store';
import Swipeable from 'react-native-swipeable-row';
import Icon from 'react-native-vector-icons/FontAwesome5';

let test = 0;


async function NotificationLoader() {
    let i;
    test += 1;
    test %= 2;
    UserStore.notifications.list = [];
    for (i = 0; i < 10 * test; ++i) {
        UserStore.notifications.list.push({
            id: i.toString(),
            time: '1/2/2020 10:00 AM',
            title: 'You Win a Lottery ! ' + i,
            description: 'hello world',
        });
    }
    console.log(UserStore.notifications.list);
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const NotificationView = ({navigation}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, top: '5%', height: '95%'}}>
                <SubScreenHeader navigation={navigation} title={'Notifications'} backButton={true}/>
            </View>
            <NotificationList/>
        </View>
    )
};


const NotificationList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [trigger, setTrigger] = useState(false);

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

    return (
        <SafeAreaView style={{position: 'absolute', top: '13%', height: '87%', width: '100%'}}>
            <FlatList
                data={UserStore.notifications.list}
                renderItem={({item}) => {
                    return (
                        <NotificationCard trigger={trigger} setTrigger={setTrigger} id={item.id} title={item.title}
                                          time={item.time}
                                          description={item.description}/>
                    );
                }
                }
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        tintColor='white'
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={ListEmptyComponent}
                extraData={trigger}
            />
        </SafeAreaView>
    );
};

const NotificationCard = ({trigger, setTrigger, id, time, title, description, borderTop}) => {
    const deleteItemById = id => {
        UserStore.notifications.list = UserStore.notifications.list.filter(item => item.id !== id);
        console.log(UserStore.notifications.list);
        setTrigger(!trigger);
    };

    const rightButtons = [
        <TouchableOpacity
            style={{height: '100%', backgroundColor: 'red', justifyContent: 'center', alignContent: 'center'}}
            onPress={() => deleteItemById(id)}
        >
            <View style={{width: 75, alignItems: 'center'}}>
                <Icon name={'trash-alt'} color={'white'} size={25}/>
                <Text style={{marginTop: 5, fontFamily: 'proxima-bold', left: 0, color: 'white'}}>Delete</Text>
            </View>
        </TouchableOpacity>,
    ];


    return (
        <Swipeable rightButtons={rightButtons}>
            <View style={{
                width: '100%',
                paddingVertical: 10,
                borderColor: 'rgb(100,100,100)',
                borderTopWidth: borderTop ? 1 : 0,
                borderBottomWidth: 1
            }}>
                <Text style={{
                    fontFamily: 'proxima-regular',
                    marginLeft: 60,
                    marginRight: 20,
                    color: 'rgb(150,150,150)',
                    fontSize: 12
                }}>{time}</Text>
                <Text style={{
                    fontFamily: 'proxima-regular',
                    marginTop: 5,
                    marginLeft: 60,
                    marginRight: 20,
                    color: 'white',
                    fontSize: 25
                }}>{title}</Text>
                <Text style={{
                    fontFamily: 'proxima-regular',
                    marginLeft: 60,
                    marginRight: 20,
                    color: 'rgb(150,150,150)',
                    fontSize: 16
                }}>{description}</Text>
            </View>
        </Swipeable>
    );
};

export default NotificationView;