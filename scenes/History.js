import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, RefreshControl, SafeAreaView, Text, TouchableHighlight, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import store from '../store';
import {connect} from 'react-redux';
import {getAllUserData} from '../firebase/functions';
import Icon from 'react-native-vector-icons/FontAwesome5';

async function HistoryLoader() {
    await getAllUserData()
        .catch(error => console.log(error));
}

const History = ({navigation, list}) => {

    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, top: '5%', height: '95%'}}>
                <SubScreenHeader navigation={navigation} title={'History'} backButton={true}/>
            </View>
            <HistoryList list={list}/>
        </View>
    );
};

const HistoryList = () => {
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
                    No History
                </Text>
            </View>
        )
    };

    const onRefresh = () => {
        setRefreshing(true);
        HistoryLoader()
            .then(() => {
                setRefreshing(false);
            });

    };
    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <SafeAreaView style={{position: 'absolute', top: '13%', height: '87%', width: '100%'}}>
            <FlatList
                data={store.getState().User.history}
                renderItem={({item}) => {
                    return (
                        <HistoryCard title={item.info} time={item.createdAt}
                                     transaction={item.amount} type={item.info} to={item.to}/>
                    );
                }}
                keyExtractor={item => item.key}
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
    )

};

const HistoryCard = ({time, title, borderTop, type, transaction, to}) => {
    const [green, setGreen] = useState(false);
    useEffect(() => {
        if (type === 'Redeem Point' || type === 'Top-Up Money') setGreen(true);
    }, []);
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
                <View style={{marginHorizontal: 20, height: '80%', flexDirection: 'row', justifyItems: 'center'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{
                            flex: 2,
                            fontFamily: 'proxima-bold',
                            color: 'white',
                            fontSize: 18
                        }}>{title} {!green ? (<><Icon name='arrow-right' color={'white'} size={14}/> {to}</>) : null}
                        </Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: 'proxima-regular',
                            color: 'rgb(150,150,150)',
                            fontSize: 14,
                        }}>{time}</Text>
                    </View>
                    <View style={{flexWrap: 'wrap'}}>
                        <Text style={{
                            fontFamily: 'proxima-bold',
                            textAlign: 'right',
                            color: green ? 'rgb(77, 240, 96)' : 'red',
                            fontSize: 18
                        }}>{green ? '+ ' : '- '}{transaction} {'\u0E3F'}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

function mapStateToProps(state) {
    return {
        list: state.User.history
    }
}

export default connect(mapStateToProps)(History);