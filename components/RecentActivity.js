import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import store from '../store';


const RecentActivity = () => {
    const recentData = store.getState().User.history[0];
    console.log('recentData ', recentData);
    const [green, setGreen] = useState(false);

    useEffect(() => {
        recentData && setGreen(recentData.info === 'Redeem Point' || recentData.info === 'Top-Up Money');
    });

    const ListGenerator = () => {
        return (
            <View style={{
                width: '100%',
                height: 60,
                borderColor: 'rgb(100,100,100)',
                borderBottomWidth: 1,
                justifyContent: 'center'
            }}>
                <View style={{height: '80%', flexDirection: 'row', justifyItems: 'center'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{
                            flex: 2,
                            fontFamily: 'proxima-regular',
                            color: 'white',
                            fontSize: 18,
                        }}>{recentData.info}</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: 'proxima-regular',
                            color: 'rgb(150,150,150)',
                            fontSize: 14,
                        }}>{recentData.createdAt}</Text>
                    </View>
                    <View style={{flexWrap: 'wrap', justifyContent: 'center'}}>
                        <Text style={{
                            fontFamily: 'proxima-bold',
                            textAlign: 'right',
                            color: green ? 'rgb(77, 240, 96)' : 'red',
                            fontSize: 18,
                            height: '100%',
                        }}>{green ? '+ ' : '- '}{recentData.amount} {'\u0E3F'}</Text>
                    </View>
                </View>
            </View>
        )
    };
    const ListEmptyComponent = () => {
        return (
            <View style={{marginTop: 10}}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'rgb(150,150,150)',
                        fontFamily: 'proxima-regular',
                        fontSize: 18
                    }}>
                    No Recent Activity
                </Text>
            </View>
        )
    };

    return (
        <View>
            <Text style={{
                fontFamily: 'proxima-bold',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
            }}>Recent Activity</Text>
            {
                recentData ? <ListGenerator/> : <ListEmptyComponent/>
            }
        </View>
    );
};

function mapStateToProps(state) {
    return {
        list: state.User.history
    }
}

export default connect(mapStateToProps)(RecentActivity);