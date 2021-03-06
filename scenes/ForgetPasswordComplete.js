import React from 'react';
import {Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles, {BlueButton as BlueButtonStyle} from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgetPasswordComplete = ({navigation}) => {
    const email = navigation.getParam('email', {});
    console.log(email);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{marginHorizontal: 20, top: '5%', justifyContent: 'flex-end'}}>
                    <SubScreenHeader title={'Forget Password'} navigation={navigation} backButton={true}/>
                    <View style={{marginTop: 20}}>
                        <View style={{alignItems: 'center'}}>
                            <Icon name={'check-circle'} size={70} color={'#2AC062'}/>
                            <Text style={[MainStyles.head2Text, {fontSize: 25, marginVertical: 20}]}>
                                Password Reset Email Sent
                            </Text>
                        </View>
                        <Text style={[MainStyles.bodyText, {marginBottom: 20}]}>An email has been sent to <Text
                            style={{fontFamily: 'proxima-bold'}}>{email}</Text>{'\n\n'}Please follow the instructions in
                            the email to reset password.</Text>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
                <View style={{flex: 1, marginHorizontal: 20}}>
                    <DoneButton navigation={navigation}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
        ;
};

const DoneButton = ({navigation}) => {
    return (
        <View style={BlueButtonStyle.buttonAlign}>
            <TouchableOpacity
                style={BlueButtonStyle.buttonContainer}
                onPress={async () => {
                    navigation.navigate('SignIn');
                }}
            >
                <Text style={[BlueButtonStyle.buttonText, {color: 'white'}]}>
                    Done
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default ForgetPasswordComplete;