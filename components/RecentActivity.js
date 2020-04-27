import React from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';


const RecentActivity = () => {
    const recentData = {
        id: 1,
        date: '1/2/2020',
        time: '10:00 AM',
        transaction: '+' + (Math.random() * 1000).toFixed(2),
    };

    const ListGenerator = () => {
        return (
            <View style={{
                width: '100%',
                height: 60,
                borderColor: 'rgb(100,100,100)',
                borderBottomWidth: 1,
                justifyContent: 'center',
            }}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{
                            flexWrap: 'wrap',
                            fontFamily: 'proxima-regular',
                            color: 'white',
                            fontSize: 16,
                        }}>
                            {recentData.date}
                        </Text>
                        <Text style={{
                            flexWrap: 'wrap',
                            fontFamily: 'proxima-regular',
                            color: 'white',
                            fontSize: 16,
                        }}>
                            {recentData.time}
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                        <Text style={{
                            flexWrap: 'wrap',
                            fontFamily: 'proxima-bold',
                            color: 'rgb(77, 240, 96)',
                            fontSize: 18,
                        }}>
                            {recentData.transaction} {'\u0E3F'}
                        </Text>
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