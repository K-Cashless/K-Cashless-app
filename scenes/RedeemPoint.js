import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from "../styles/MainStyles";
import BlueButton from '../components/BlueButton';
import SubScreenHeader from "../components/SubScreenHeader";
import KPointRect from "../components/KPointRect";
import Icon from 'react-native-vector-icons/FontAwesome5';
import store from '../store';
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import * as actions from '../actions';

const RedeemPoint = ({navigation}) => {
    const [redeemValue, setRedeemValue] = useState(Math.floor(store.getState().User.kpoints / 200));
    const [redeemable, setRedeemable] = useState(store.getState().User.kpoints >= 200);

    const ValueTable = () => {
        if (redeemable) {
            return (
                <View style={{marginTop: 50}}>
                    <View>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 18,
                            textAlign: 'center',
                            fontFamily: 'proxima-regular'
                        }]}>REDEEMABLE K POINT</Text>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 40,
                            textAlign: 'center',
                            justifyContent: 'center'
                        }]}>{redeemValue * 200}</Text>
                    </View>
                    <Icon style={{alignSelf: 'center', margin: 40}} name={'arrow-down'} size={35} color={'white'}/>
                    <View>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 18,
                            textAlign: 'center',
                            fontFamily: 'proxima-regular'
                        }]}>EQUAL TO</Text>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 40,
                            textAlign: 'center',
                            justifyContent: 'center'
                        }]}>{redeemValue} <Text style={{fontSize: 23}}>{'\u0E3F'}</Text></Text>
                    </View>
                </View>
            )
        } else {
            return (
                <Text style={[MainStyles.bodyText, {
                    color: 'red',
                    paddingTop: 10,
                    fontSize: 18
                }]}>
                    You can't redeem point as the minimum point to redeem is 200.
                </Text>
            )
        }
    };

    useEffect(() => {
        (async () => {
            await axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                .then(async (res) => {
                    console.log(res);
                    store.dispatch(actions.User.setId(res.data[0].userId));
                    store.dispatch(actions.User.setFirstName(res.data[0].firstName));
                    store.dispatch(actions.User.setLastName(res.data[0].lastName));
                    store.dispatch(actions.User.setBalance(res.data[0].deposit));
                    store.dispatch(actions.User.setKpoints(res.data[0].point));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));
                    setRedeemValue(Math.floor(store.getState().User.kpoints / 200));
                    setRedeemable(store.getState().User.kpoints >= 200);
                })
                .catch(error => {
                    Alert.alert('Error Updating K Point');
                    console.log(error);
                });
        })();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{
                    marginHorizontal: 20,
                    top: '5%',
                    height: '100%',
                }}>
                    <SubScreenHeader navigation={navigation} title={'Redeem Points'} backButton={true}/>
                    <KPointRect style={{paddingTop: 10}}/>
                    <Text style={[MainStyles.bodyText, {paddingTop: 20, justifyContent: 'center'}]}>
                        <Icon name={'info-circle'} color={'white'} size={18}/> 200 Points = 1 {'\u0E3F'}
                    </Text>

                    <ValueTable/>

                    <RedeemButton disable={!redeemable} navigation={navigation} redeemAmount={redeemValue * 200}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const RedeemButton = ({disable, navigation, redeemAmount}) => {
    const handleRedeemPoint = () => {
        return new Promise(async (resolve, reject) => {
            await axios.post(API_URL.REDEEM_POINT, {}, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                .then(res => {
                    console.log(res);
                    const amountRedeemed = res.data.transaction.amount;
                    navigation.replace('RedeemPointComplete', {
                        info: {
                            redeemed: amountRedeemed * 200,
                            earned: amountRedeemed
                        }
                    });
                    resolve('success');
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Redeem Point', 'Please try again later');
                    reject();
                })

        })
    };
    return (
        <BlueButton text={redeemAmount > 0 ? 'Redeem ' + redeemAmount + ' Points' : 'Redeem Point'} disable={disable}
                    onPress={handleRedeemPoint}/>
    );
};

export default RedeemPoint;