import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DoneButton from '../components/DoneButton';
import {connect} from 'react-redux';
import {getAllUserData} from "../firebase/functions";

const PaymentComplete = ({navigation}) => {
    const data = navigation.getParam('data', {
        id: null,
        time: null,
        from: null,
        senderName: null,
        receiverName: null,
        to: null,
        amount: null,
    });

    useEffect(() => {
        getAllUserData()
            .catch(err => {
                console.log(err);
                Alert.alert('Error Trying To Update Data');
            });
    }, []);

    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center'}}>
                <View style={{flex: 1, width: '100%', marginTop: '5%', marginBottom: '20%'}}>
                    <View style={{flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                        <View style={{flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'check'} size={50} color={'#2AC062'}/>
                        </View>
                        <Text style={[MainStyles.head2Text, {
                            marginLeft: 20,
                            fontSize: 27,
                            width: '100%',
                            textAlign: 'left',
                            color: '#2AC062',
                        }]}>Payment Successful</Text>
                    </View>
                    <View style={{flex: 0.3}}>
                        <Text
                            style={[MainStyles.bodyText, {color: 'rgb(150,150,150)'}]}>{(new Date(data.time)).toLocaleString()}</Text>
                        {/*<Text style={[MainStyles.bodyText, {color: 'rgb(150,150,150)'}]}>ID: {data.id}</Text>*/}
                    </View>
                    <View style={{flex: 4, width: '100%', top: 50, justifyContent: 'flex-start'}}>
                        <View style={{flex: 1}}>
                            <InfoSection title={'FROM'} value={data.senderName} id={data.from}/>
                            <View style={{paddingTop: 20}}>
                                <InfoSection title={'TO'} value={data.receiverName} id={data.to}/>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-start'}}>
                            <InfoSection title={'AMOUNT'} value={data.amount}/>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginHorizontal: 20, bottom: '5%'}}>
                <DoneButton navigation={navigation}/>
            </View>
        </View>
    );
};

const InfoSection = ({title, value, id}) => {
    return (
        <View>
            <Text style={[MainStyles.head2Text, {fontSize: 20}]}>{title}</Text>
            <View style={{justifyContent: 'flex-end', width: '100%'}}>
                <Text style={[MainStyles.head2Text, {
                    fontFamily: 'proxima-regular',
                    fontSize: 22,
                    textAlign: 'right',
                    textTransform: 'uppercase',
                }]}>{value}</Text>
                <Text style={[MainStyles.head2Text, {
                    fontFamily: 'proxima-regular',
                    fontSize: 18,
                    textAlign: 'right',
                    color: 'rgb(150,150,150)'
                }]}>{id}</Text>
            </View>
        </View>
    )
};

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(PaymentComplete);