import React, {useState} from 'react';
import {View, Text, SafeAreaView, Dimensions, FlatList, RefreshControl} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";

let notificationItems = [];
let test = 0;

async function NotificationLoader() {
    let i;
    test += 1;
    test %= 2;
    notificationItems = [];
    for (i = 0; i < 10 * test; ++i) {
        notificationItems.push({
            id: i.toString(),
            time: '1/2/2020 10:00 AM',
            title: 'You Win a Lottery ! ' + i,
            description: 'hello world',
        });
    }
    console.log(notificationItems);
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

    const ListEmptyComponent = () => {
        return (
            <View style={{height: Dimensions.get('window').height / 4, justifyContent: 'flex-end'}}>
                <Text
                    style={{textAlign: 'center', color: 'rgb(150,150,150)', fontFamily: 'proxima-bold', fontSize: 25}}>
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
                data={notificationItems}
                renderItem={({item}) => {
                    return (
                        <NotificationCard title={item.title} time={item.time}
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
            />
        </SafeAreaView>
    );
};

const NotificationCard = ({time, title, description, borderTop}) => {
    return (
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
    );
};

export default NotificationView;