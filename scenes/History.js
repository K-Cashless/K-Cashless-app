import React, {useState} from 'react';
import {View, Image, Text, SafeAreaView, RefreshControl, TouchableHighlight, FlatList} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";

let historyItems = [];

async function HistoryLoader() {
    let i;
    historyItems = [];
    for (i = 0; i < 100; ++i) {
        historyItems.push({
            id: i.toString(),
            pic: require('../assets/demoPic.png'),
            time: '1/2/2020 10:00 AM',
            title: 'Shop ' + i,
            transaction: '-' + (Math.random() * 1000).toFixed(2),
            type: 'pay'
        });
    }
    console.log(historyItems);
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const History = ({navigation}) => {
    const [isDataPulled, setDataPulled] = useState(false);

    if (!isDataPulled) {
        HistoryLoader().then(setDataPulled(true));
    }

    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, top: '5%', height: '95%'}}>
                <SubScreenHeader navigation={navigation} title={'History'} backButton={true}/>
            </View>
            <HistoryView/>
        </View>
    );
};

const HistoryView = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        HistoryLoader().then(() => wait(3000)).then(() => setRefreshing(false)); // wait(3000) to simulate fetching data from server
    };

    if (historyItems.length !== 0) {
        return (
            <SafeAreaView style={{position: 'absolute', top: '13%', height: '87%', width: '100%'}}>
                <FlatList
                    data={historyItems}
                    renderItem={({item}) => <HistoryCard pic={item.pic} title={item.title} time={item.time}
                                                         transaction={item.transaction} type={item.type}/>}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                            tintColor='white'
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </SafeAreaView>
        )
    } else {
        return (
            <View>

            </View>
        )
    }
};


const HistoryCard = ({time, title, borderTop, type, transaction, pic}) => {
    return (
        <TouchableHighlight>
            <View style={{
                width: '100%',
                height: 80,
                paddingVertical: 10,
                borderColor: 'rgb(100,100,100)',
                borderTopWidth: borderTop ? 1 : 0,
                borderBottomWidth: 1,
                justifyContent: 'center'
            }}>
                <View style={{marginHorizontal: 20, flexDirection: 'row', justifyItems: 'center'}}>
                    <View style={{flexWrap: 'wrap', alignItems: 'right', justifyContent: 'center'}}>
                        <Image source={pic}
                               style={{width: 50, height: 50, borderRadius: 5}}
                               resizeMode='cover'/>
                    </View>
                    <View style={{flex: 1, paddingLeft: 20, justifyContent: 'center'}}>
                        <Text style={{
                            flex: 2,
                            fontFamily: 'proxima-bold',
                            color: 'white',
                            fontSize: 20
                        }}>{title}</Text>
                        <Text style={{
                            flex: 1,
                            // backgroundColor:'blue',
                            fontFamily: 'proxima-regular',
                            color: 'rgb(150,150,150)',
                            fontSize: 12,
                        }}>{time}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{
                            // backgroundColor:'yellow',
                            fontFamily: 'proxima-bold',
                            textAlign: 'right',
                            color: type === 'pay' ? 'red' : 'green',
                            fontSize: 18
                        }}>{transaction} {'\u0E3F'}</Text>
                    </View>
                </View>

            </View>
        </TouchableHighlight>
    );
};

export default History;