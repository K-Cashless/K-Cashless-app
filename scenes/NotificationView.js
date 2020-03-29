import React, {useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import MainStyles from '../styles/MainStyles';
import * as color from '../styles/Colors';
import SubScreenHeader from "../components/SubScreenHeader";

const NotificationView = ({navigation}) => {
    const [refreshing,setRefreshing] = useState(false);
    const testItem=[
        {time: '1/2/2020 10:00 AM',title: 'This is title.',description:'This is description'},
        {time: '1/2/2020 10:00 AM',title: 'This is title.',description:'This is description'},
        {time: '1/2/2020 10:00 AM',title: 'This is title.',description:'This is description'},
        {time: '1/2/2020 10:00 AM',title: 'This is title.',description:'This is description'},
        {time: '1/2/2020 10:00 AM',title: 'This is title.',description:'This is description'},
        {time: '1/2/2020 10:00 AM',title: 'This is title.',description:'This is description'}
    ];
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, top: '5%', height: '95%'}}>
                <SubScreenHeader navigation={navigation} title={'Notifications'} backButton={true}/>
            </View>
            <View style={{position: 'absolute', top: '13%', height: '87%', width: '100%'}}>
                <ScrollView refreshControl={
                    <RefreshControl
                        colors='white'
                        tintColor='white'
                        refreshing={refreshing}
                        onRefreshing={() => {setRefreshing(true)}}/>
                } indicatorStyle='white'>
                    {
                        testItem.map((value, index) => (
                            <View key={index}>
                                <NotificationCard time={value.time} title={value.title} description={value.description}/>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    );
};

const NotificationCard = ({time, title, description, borderTop}) => {
    return (
        <View style={{
            width: '100%',
            paddingVertical: 10,
            borderColor: 'rgb(100,100,100)',
            borderTopWidth: borderTop? 1:0,
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
                fontFamily: 'proxima-bold',
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