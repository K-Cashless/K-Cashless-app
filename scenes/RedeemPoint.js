import React from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from "../styles/MainStyles";
import BlueButton from '../components/BlueButton';
import SubScreenHeader from "../components/SubScreenHeader";
import KPointRect from "../components/KPointRect";
import Icon from 'react-native-vector-icons/FontAwesome5';
import store from '../store';

const RedeemPoint = ({navigation}) => {
    const state = store.getState();
    const redeemValue = Math.floor(state.User.kpoints / 200) + 1000;
    const redeemable = !(redeemValue < 1);
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
                    {
                        redeemable ? (
                            <View style={{paddingTop: 50}}>
                                <Text style={MainStyles.head2Text}>YOUR K POINT WORTH</Text>
                                <Text style={[MainStyles.head2Text, {
                                    fontSize: 50,
                                    textAlign: 'right',
                                    justifyContent: 'center'
                                }]}>{redeemValue} <Text
                                    style={{fontSize: 30}}>{'\u0E3F'}</Text></Text>
                            </View>
                        ) : (
                            <Text style={[MainStyles.bodyText, {
                                color: 'red',
                                paddingTop: 10,
                                fontSize: 18
                            }]}>
                                You can't redeem point as the minimum point to redeem is 200.
                            </Text>
                        )
                    }

                    <RedeemButton disable={!redeemable} navigation={navigation}/>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const RedeemButton = ({disable, navigation}) => {
    return (
        <BlueButton text={'Redeem All Points'} disable={disable}
                    onPress={() => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                navigation.replace('RedeemPointComplete');
                                resolve('success');
                            }, 1000);
                        });
                    }}/>
    );
};

export default RedeemPoint;