import React, {useState} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NumberTextInput from "../components/NumberTextInput";
import LInfoSectionTHB from '../components/LInfoSectionTHB';
import BlueButton from '../components/BlueButton';
import {connect} from 'react-redux';

const PaymentInfo = ({navigation, balance}) => {
    const shopInfo = navigation.getParam('shopInfo', {});

    const [payValue, setPayValue] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const payValueError = (payValue > balance || payValue <= 0) && isChanged;
    console.log(shopInfo);
    return (
        <>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <KeyboardAvoidingView
                    behavior={Platform.Os === "ios" ? "padding" : "height"}
                    style={{flex: 1}}
                >
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
                                        value={payValue}
                                        placeholder={'Enter amount to pay'}
                                        error={payValueError}
                                    />
                                    <Text style={{
                                        top: 5,
                                        fontFamily: 'proxima-bold',
                                        color: 'red',
                                    }}>{payValueError ? 'Please Enter the Correct Amount' : ' '}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
            <View style={{marginHorizontal: 20, bottom: '5%'}}>
                <BlueButton
                    text={'Pay ' + (payValue * 1).toFixed(2) + ' ' + '\u0E3F'}
                    navigation={navigation}
                    disable={payValueError || !isChanged}
                    onPress={() => {
                        handlePayment(navigation, {shopInfo: shopInfo, amount: payValue})
                    }}
                />
            </View>
        </>
    )
};
const handlePayment = (navigation, dataToSend) => {
    // TODO - firebase
    navigation.replace('PaymentComplete', {data: dataToSend});
};

const ShopInfoComponent = ({shopInfo}) => {
    return (
        <View style={{width: '100%', marginTop: 20, marginBottom: 20, flexDirection: 'row'}}>
            {/*sample data*/}
            <Image source={require('../assets/demoPic.png')}
                   style={{width: 90, height: 90, borderRadius: 5}}
                   resizeMode='cover'/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='middle'
                    style={{
                        fontFamily: 'proxima-bold',
                        color: 'white',
                        fontSize: 25,
                        marginLeft: 10,
                        textAlign: 'left',
                    }}>
                    {shopInfo.name}
                </Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='middle'
                    style={{
                        fontFamily: 'proxima-regular',
                        color: 'white',
                        fontSize: 20,
                        marginLeft: 10,
                        textAlign: 'left',
                    }}>
                    {shopInfo.location}
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