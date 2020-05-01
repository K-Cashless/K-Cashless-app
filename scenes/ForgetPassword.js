import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NormalTextInput from "../components/NormalTextInput";
import TransparentButton from "../components/TransparentButton";
import axios from 'axios';
import API_URL from "../firebase/apiLinks";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const ForgetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const errorState = useState(true);
    const [allowProceed, setAllowProceed] = useState(false);
    useEffect(() => {
        setAllowProceed(!errorState[0]);
    });
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{marginHorizontal: 20, top: '5%', height: '100%', justifyContent: 'flex-start'}}>
                    <KeyboardAwareScrollView>
                        <SubScreenHeader title={'Forget Password'} navigation={navigation} backButton={true}/>
                        <View style={{marginTop: 20}}>
                            <Text style={[MainStyles.bodyText, {marginBottom: 20}]}>Please enter your email</Text>
                            <NormalTextInput
                                placeholder={'Enter your email'}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                style={{marginBottom: 5}}
                                errorRule={[{
                                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Incorrect Email Format'
                                }]}
                                errorStatus={errorState}
                            />
                            <View style={{marginTop: 10, alignItems: 'flex-end'}}>
                                <TransparentButton
                                    style={{backgroundColor: allowProceed ? 'rgb(38,115,226)' : 'rgb(150,150,150)'}}
                                    text={'Next'}
                                    disabled={!allowProceed}
                                    onPress={() => {
                                        return new Promise((resolve, reject) => {
                                            axios.post(API_URL.FORGET_PASSWORD, {email: email})
                                                .then(() => {
                                                    navigation.replace('ForgetPasswordComplete', {email: email});
                                                    resolve();
                                                })
                                                .catch(error => {
                                                    console.log(error.response);
                                                    // alert("ERROR");
                                                    Alert.alert('Error', 'Please check your email and try again.');
                                                    reject();
                                                })
                                        })
                                    }}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
        ;
};

export default ForgetPassword;