import React, {useState} from 'react';
import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import MainStyles from "../styles/MainStyles";
import SubScreenHeader from "../components/SubScreenHeader";
import KPointRect from "../components/KPointRect";
import NumberTextInput from "../components/NumberTextInput";

const RedeemPoint = ({navigation}) => {
    const [redeemValue, setRedeemValue] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const redeemValueError = (redeemValue > 100 || redeemValue < 1 || redeemValue.length === 0) && isChanged;
    const value = () => {
        return (redeemValueError) ? ('0.00') : ((redeemValue / 25).toFixed(2))
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{
                    marginHorizontal: 20,
                    top: '5%',
                }}>
                    <SubScreenHeader navigation={navigation} title={'Redeem Points'} backButton={true}/>
                    <KPointRect style={{top: 10}} point={100}/>
                    <Text style={[MainStyles.bodyText, {top: 20}]}>25 Points = 1 THB</Text>
                    <View style={{top: 50}}>
                        <Text style={MainStyles.head2Text}>POINTS TO REDEEM</Text>
                        <NumberTextInput
                            style={{fontSize: 30, textAlign: 'right'}}
                            onChangeText={(text) => {
                                setRedeemValue(text);
                                setIsChanged(true);
                            }}
                            value={redeemValue}
                            placeholder={'1 - ' + '100'}
                            error={redeemValueError}
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
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};

export default RedeemPoint;