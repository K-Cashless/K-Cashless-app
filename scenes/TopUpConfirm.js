import React from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import MainStyles from '../styles/MainStyles';
import * as color from '../styles/Colors';
import SubScreenHeader from '../components/SubScreenHeader';
import BlueButton from "../components/BlueButton";

const TopUp = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{
                    marginHorizontal: 20,
                    top: '5%',
                    height: '100%',
                }}>
                    <SubScreenHeader navigation={navigation} title={'Top Up'} backButton={true}/>
                    <Text style={[MainStyles.bodyText, {paddingTop: 20}]}>You are going to top up your account using
                        this card.</Text>
                    <View style={{paddingTop: 20}}>
                        <TopUpCard/>
                    </View>
                    <Text style={[MainStyles.bodyText, {paddingTop: 20}]}>Press Confirm button to continue.</Text>
                    <BlueButton text={'Confirm'} onPress={() => {
                        navigation.replace('TopUpComplete');
                    }} disable={false}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const TopUpCard = () => {
    return (
        <View style={{
            backgroundColor: 'white',
            width: '100%',
            height: 170,
            padding: 15,
            borderRadius: 5,
            justifyContent: 'flex-start',
        }}>
            <Text style={{fontFamily: 'proxima-extrabold', fontSize: 35, color: color.primary}}>K Cashless</Text>
            <Text style={{fontFamily: 'proxima-regular', fontSize: 25, color: color.primary}}>Top Up Card</Text>
            <Text style={{
                position: 'absolute',
                left: 15,
                bottom: 10,
                fontFamily: 'proxima-regular',
                fontSize: 20,
                color: color.primary
            }}>NOX3JDis0D</Text>
            <Text style={{
                position: 'absolute',
                right: 15,
                bottom: 10,
                fontFamily: 'proxima-extrabold',
                fontSize: 40,
                color: color.primary
            }}>100 {'\u0E3F'}</Text>
        </View>
    );
};

export default TopUp;