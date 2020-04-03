import React, {useState} from 'react';
import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import MainStyles from "../styles/MainStyles";
import BlueButton from '../components/BlueButton';
import SubScreenHeader from "../components/SubScreenHeader";
import KPointRect from "../components/KPointRect";
import NumberTextInput from "../components/NumberTextInput";
import Icon from 'react-native-vector-icons/FontAwesome5';
import store from '../store';
import * as actions from '../actions';

const RedeemPoint = ({navigation}) => {
    const [redeemValue, setRedeemValue] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const state = store.getState();
    const redeemValueError = (redeemValue > state.User.kpoints || redeemValue < 1 || redeemValue.length === 0) && isChanged;
    const value = () => {
        return (redeemValueError) ? ('0.00') : ((redeemValue / 25).toFixed(2))
    };
    let placeholderMsg;
    if (state.User.kpoints === 0) placeholderMsg = 'No Points';
    else placeholderMsg = '1 - ' + state.User.kpoints;

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
                    <Text style={[MainStyles.bodyText, {top: 20, justifyContent: 'center'}]}>
                        <Icon name={'info-circle'} color={'white'} size={18}/> 25 Points = 1 {'\u0E3F'}
                    </Text>

                    <View style={{paddingTop: 50}}>
                        {/*Points to Redeem Input*/}
                        <Text style={MainStyles.head2Text}>POINTS TO REDEEM</Text>
                        <NumberTextInput
                            style={{fontSize: 30, textAlign: 'right'}}
                            onChangeText={(text) => {
                                setRedeemValue(text);
                                setIsChanged(true);
                            }}
                            value={redeemValue}
                            placeholder={placeholderMsg}
                            error={redeemValueError}
                            editable={state.User.kpoints !== 0}
                        />
                        <Text style={{
                            top: 5,
                            fontFamily: 'proxima-bold',
                            color: 'red',
                        }}>{redeemValueError ? 'Please Enter the Correct Amount of Points' : ' '}</Text>

                        <View style={{top: 20}}>
                            <Text style={MainStyles.head2Text}>EQUAL TO</Text>
                            <Text style={[MainStyles.head2Text, {
                                fontSize: 50,
                                textAlign: 'right',
                                justifyContent: 'center'
                            }]}>{value()} <Text style={{fontSize: 30}}>{'\u0E3F'}</Text></Text>
                        </View>
                    </View>
                    <RedeemButton value={redeemValue} disable={redeemValueError || !isChanged} navigation={navigation}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const RedeemButton = ({value, disable, navigation}) => {
    return (
        <BlueButton text={'Redeem ' + value + ' Points'} disable={disable}
                    onPress={() => {
                        store.dispatch(actions.User.setKpoints(store.getState().User.kpoints - value));
                        navigation.replace('RedeemPointComplete');
                    }}/>
    );
};

export default RedeemPoint;