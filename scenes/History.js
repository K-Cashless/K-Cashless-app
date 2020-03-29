import React, {useState} from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";

const History = ({navigation}) =>{
    const [refreshing,setRefreshing] = useState(false);
    const testItem=[
        {time: '1/2/2020 10:00 AM',title: 'Shop A',transaction:'-25.00',type: 'pay'},
        {time: '1/2/2020 10:00 AM',title: 'Shop B',transaction:'-80.00',type: 'pay'},
        {time: '1/2/2020 10:00 AM',title: 'Shop C',transaction:'-400.00',type: 'pay'},
        {time: '1/2/2020 10:00 AM',title: 'Top Up',transaction:'+125.00',type: 'top-up'},
    ];
    return(
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, top: '5%', height: '95%'}}>
                <SubScreenHeader navigation={navigation} title={'History'} backButton={true}/>
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
                                <HistoryCard time={value.time} title={value.title} transaction={value.transaction} type={value.type}/>
                            </View>
                        ))
                    }
                </ScrollView>

            </View>
        </View>
    );
};
const HistoryCard = ({time, title, borderTop, type,transaction,id}) => {
    return (
        <TouchableHighlight>
            <View style={{
                width: '100%',
                paddingVertical: 10,
                borderColor: 'rgb(100,100,100)',
                borderTopWidth: borderTop? 1:0,
                borderBottomWidth: 1
            }}>
                <Text style={{
                    fontFamily: 'proxima-regular',
                    marginTop: 5,
                    marginLeft: 60,
                    marginRight: 20,
                    color: 'white',
                    fontSize: 20
                }}>{title}</Text>
                <Text style={{
                    fontFamily: 'proxima-regular',
                    right: 20,
                    textAlign: 'right',
                    color: 'rgb(150,150,150)',
                    fontSize: 12,
                }}>{time}</Text>
                <Text style={{
                    position: 'absolute',
                    fontFamily: 'proxima-bold',
                    marginTop: 15,
                    right: 20,
                    textAlign: 'right',
                    color: type==='pay'? 'red':'green',
                    fontSize: 18
                }}>{transaction} {'\u0E3F'}</Text>
            </View>
        </TouchableHighlight>
    );
};

export default History;