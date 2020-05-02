import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import MainStyles from "../styles/MainStyles";
import BlueButton from '../components/BlueButton';
import SubScreenHeader from "../components/SubScreenHeader";
import KPointRect from "../components/KPointRect";
import Icon from 'react-native-vector-icons/FontAwesome5';
import store from '../store';
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import {getAllUserData} from "../firebase/functions";

const RedeemPoint = ({navigation}) => {
    const [redeemValue, setRedeemValue] = useState(Math.floor(store.getState().User.kpoints / 200));
    const [redeemable, setRedeemable] = useState(false);

    const ValueTable = () => {
        if (redeemable) {
            return (
                <View style={{marginTop: 25}}>
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
                    <Icon style={{alignSelf: 'center', margin: 20}} name={'arrow-down'} size={35} color={'white'}/>
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
        getAllUserData()
            .then(() => {
                setRedeemValue(Math.floor(store.getState().User.kpoints / 200));
                setRedeemable(store.getState().User.kpoints >= 200);
            })
            .catch(err => {
                console.log(err);
                Alert.alert('Error Trying To Update Data');
            });
    }, []);

    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{
                marginHorizontal: 20,
                marginTop: '7%',
                height: '100%',
            }}>
                <SubScreenHeader navigation={navigation} title={'Redeem Points'} backButton={true}/>
                <ScrollView>
                    <KPointRect style={{paddingTop: 10}}/>
                    <Text style={[MainStyles.bodyText, {paddingTop: 20, justifyContent: 'center'}]}>
                        <Icon name={'info-circle'} color={'white'} size={18}/> 200 Points = 1 {'\u0E3F'}
                    </Text>
                    <ValueTable/>
                    <View style={{height: 150}}/>
                </ScrollView>
                <RedeemButton disable={!redeemable} navigation={navigation} redeemAmount={redeemValue * 200}/>
            </View>
        </View>
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