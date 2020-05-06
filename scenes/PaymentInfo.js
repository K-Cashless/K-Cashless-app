import React, {useEffect, useState} from 'react';
import {Alert, Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NumberTextInput from "../components/NumberTextInput";
import LInfoSectionTHB from '../components/LInfoSectionTHB';
import BlueButton from '../components/BlueButton';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import store from '../store';
import {getAllUserData} from "../firebase/functions";

const PaymentInfo = ({navigation, balance}) => {
    const shopInfo = navigation.getParam('shopInfo', {});

    const [payValue, setPayValue] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [payValueError, setPayValueError] = useState('');

    useEffect(() => {
        if ((!(/^[0-9]*\.[0-9]{2}$/.test(payValue)) || payValue > store.getState().User.balance || payValue <= 0) && isChanged) {
            setPayValueError('Please Enter the Correct Amount and Correct Format (i.e. 25.00)');
        } else {
            setPayValueError('');
        }
    });
    useEffect(() => {
        getAllUserData().then(null);
    }, []);
    return (
        <>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <KeyboardAwareScrollView>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setPayValue(payValue);
                            Keyboard.dismiss();
                        }}>
                        <View style={{marginHorizontal: 20, justifyContent: 'flex-end'}}>
                            <View style={{top: '5%', width: '100%'}}>
                                <SubScreenHeader navigation={navigation} title={'Payment'} backButton={true}/>
                                <ShopInfoComponent shopInfo={shopInfo}/>
                                <LInfoSectionTHB title={'ACCOUNT BALANCE'} value={balance.toFixed(2)}/>
                                <View style={{paddingBottom: 50}}>
                                    <Text style={[MainStyles.head2Text, {marginTop: 20}]}>AMOUNT TO PAY</Text>
                                    <NumberTextInput
                                        style={{fontSize: 30, textAlign: 'right'}}
                                        onChangeText={(text) => {
                                            setPayValue(text);
                                            setIsChanged(true);
                                        }}
                                        onBlur={() => setPayValue((Math.floor(payValue * 1)).toFixed(2))}
                                        value={payValue}
                                        placeholder={'Enter amount to pay'}
                                        error={payValueError}
                                    />
                                    <Text style={[MainStyles.bodyText, {marginTop: 5, color: 'red', fontSize: 15}]}>
                                        {payValueError}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
            </View>
            <View style={{marginHorizontal: 20, bottom: '5%'}}>
                <BlueButton
                    text={'Pay ' + Math.floor(payValue * 100) / 100 + ' ' + '\u0E3F'}
                    navigation={navigation}
                    disable={payValueError.length > 0 || !isChanged}
                    onPress={() => {
                        return handlePayment(navigation, {shopInfo: shopInfo, amount: payValue})
                    }}
                />
            </View>
        </>
    )
};
const handlePayment = (navigation, dataToSend) => {
    return new Promise(async (resolve, reject) => {
        const infoToSend = {cost: dataToSend.amount};
        await axios.post(API_URL.TRANSFER_TO_MERCHANT + '/' + dataToSend.shopInfo.id, infoToSend, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
            .then(res => {
                console.log(res.data.transaction);
                const infoToPass = {
                    id: 'We have no ID, just yet!',
                    time: res.data.transaction.createdAt,
                    from: res.data.transaction.from,
                    senderName: store.getState().User.firstName + " " + store.getState().User.lastName,
                    receiverName: dataToSend.shopInfo.name,
                    to: res.data.transaction.to,
                    amount: res.data.transaction.amount,
                };
                navigation.replace('PaymentComplete', {data: infoToPass});
                resolve();
            })
            .catch(error => {
                Alert.alert('Payment Error');
                console.log(error.response);
                reject();
            });
    });

};

const ShopInfoComponent = ({shopInfo}) => {
    return (
        <View style={{width: '100%', marginTop: 20, marginBottom: 20, flexDirection: 'row'}}>
            <Image source={{uri: shopInfo.pic}}
                   style={{width: 90, height: 90, borderRadius: 90}}
                   resizeMode='cover'/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='middle'
                    style={{
                        fontFamily: 'proxima-bold',
                        color: 'white',
                        fontSize: 25,
                        marginLeft: 20,
                        textAlign: 'left',
                    }}>
                    {shopInfo.name}
                </Text>
            </View>
        </View>
    )
};

function mapStateToProps(state) {
    return ({
        balance: state.User.balance
    });
}

export default connect(mapStateToProps)(PaymentInfo);