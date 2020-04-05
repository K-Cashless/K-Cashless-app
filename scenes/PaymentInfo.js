import React, {useState} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NumberTextInput from "../components/NumberTextInput";
import LInfoSectionTHB from '../components/LInfoSectionTHB';
import BlueButton from '../components/BlueButton';
import {connect} from 'react-redux';

const PaymentInfo = ({navigation, balance}) => {
    const shopInfo = {name: 'Starbucks', location: 'Building A'}; // sample data
    const [payValue, setPayValue] = useState('');
    return (
        <>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <KeyboardAvoidingView
                    behavior={Platform.Os === "ios" ? "padding" : "height"}
                    style={{flex: 1}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setPayValue((payValue / 1).toFixed(2));
                            Keyboard.dismiss();
                        }}>
                        <View style={{
                            marginHorizontal: 20,
                            top: '5%',
                            justifyContent: 'flex-end'
                        }}>
                            <SubScreenHeader navigation={navigation} title={'Payment'} backButton={true}/>
                            <ShopInfoComponent shopInfo={shopInfo}/>
                            <LInfoSectionTHB title={'ACCOUNT BALANCE'} value={balance}/>
                            <View style={{paddingBottom: 50}}>
                                <Text style={[MainStyles.head2Text, {marginTop: 20}]}>AMOUNT TO PAY</Text>
                                <NumberTextInput
                                    style={{fontSize: 30, textAlign: 'right'}}
                                    onChangeText={(text) => {
                                        setPayValue(text);
                                    }}
                                    value={payValue}
                                    placeholder={'Enter amount to pay'}
                                    error={false}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
            <View style={{marginHorizontal: 20, bottom: '5%'}}>
                <BlueButton
                    text={'Pay ' + payValue + ' ' + '\u0E3F'}
                    navigation={navigation}
                    disable={false}
                    onPress={() => navigation.replace('PaymentComplete')}
                />
            </View>
        </>
    )
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