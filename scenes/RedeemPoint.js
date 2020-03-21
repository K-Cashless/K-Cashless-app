import React, {useState} from 'react';
import {Text, View, TouchableWithoutFeedback, TouchableOpacity, Keyboard, StyleSheet} from 'react-native';
import MainStyles from "../styles/MainStyles";
import SubScreenHeader from "../components/SubScreenHeader";
import KPointRect from "../components/KPointRect";
import NumberTextInput from "../components/NumberTextInput";
import {BallIndicator} from "react-native-indicators";
import Icon from 'react-native-vector-icons/FontAwesome5';

const MAX_POINTS = 100;

const RedeemPoint = ({navigation}) => {
    const [redeemValue, setRedeemValue] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const redeemValueError = (redeemValue > MAX_POINTS || redeemValue < 1 || redeemValue.length === 0) && isChanged;
    const value = () => {
        return (redeemValueError) ? ('0.00') : ((redeemValue / 25).toFixed(2))
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{
                    marginHorizontal: 20,
                    top: '5%',
                    height: '100%',
                }}>
                    <SubScreenHeader navigation={navigation} title={'Redeem Points'} backButton={true}/>
                    <KPointRect style={{top: 10}} point={100}/>
                    <Text style={[MainStyles.bodyText, {top: 20, justifyContent: 'center'}]}>
                        <Icon name={'info-circle'} color={'white'} size={18}/> 25 Points = 1 {'\u0E3F'}
                    </Text>

                    <View style={{top: 50}}>
                        {/*Points to Redeem Input*/}
                        <Text style={MainStyles.head2Text}>POINTS TO REDEEM</Text>
                        <NumberTextInput
                            style={{fontSize: 30, textAlign: 'right'}}
                            onChangeText={(text) => {
                                setRedeemValue(text);
                                setIsChanged(true);
                            }}
                            value={redeemValue}
                            placeholder={'1 - ' + MAX_POINTS}
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
                    <RedeemButton value={redeemValue} disable={redeemValueError || !isChanged} navigation={navigation}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const RedeemButton = ({value, disable, navigation}) => {
    const styles = StyleSheet.create({
        buttonContainer: {
            height: 70,
            width: '100%',
            borderRadius: 3,
            backgroundColor: 'rgb(38,115,226)',
            justifyContent: 'center',
        },
        buttonContainerDisable: {
            height: 70,
            width: '100%',
            borderRadius: 3,
            backgroundColor: 'rgba(38,115,226,0.5)',
            justifyContent: 'center',
        },
        buttonAlign: {
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            bottom: 55,
        },
        buttonText: {
            fontFamily: 'proxima-bold',
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        buttonContainerOutline: {
            height: 70,
            width: '100%',
            borderRadius: 3,
            borderWidth: 3,
            borderColor: 'rgb(38,115,226)',
            backgroundColor: 'rgba(0,0,0,0)',
            justifyContent: 'center',
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    let buttonStyle = styles.buttonContainer;
    let buttonTextColor = 'white';
    if (disable) {
        buttonStyle = styles.buttonContainerDisable;
        buttonTextColor = 'rgba(255,255,255,0.5)';
    } else if (isLoading) {
        buttonStyle = styles.buttonContainerOutline;
    }
    return (
        <View style={styles.buttonAlign}>
            <TouchableOpacity
                style={buttonStyle}
                onPress={() => {
                    setIsLoading(true);
                    navigation.navigate('RedeemPointComplete');
                }}
                disabled={disable}>
                <Text style={[styles.buttonText, {color: buttonTextColor}]}>
                    {isLoading ? ('Processing...') : ('Redeem ' + value + ' ' + 'Points')}
                </Text>
            </TouchableOpacity>
            {isLoading ? (
                <View style={{
                    position: 'absolute',
                    right: 30,
                }}>
                    <BallIndicator color={'rgb(38,115,226)'} size={20}/>
                </View>) : null}
        </View>
    );
};

export default RedeemPoint;