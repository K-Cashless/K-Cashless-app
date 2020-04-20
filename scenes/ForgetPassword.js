import React, {useState} from 'react';
import {Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NormalTextInput from "../components/NormalTextInput";
import TransparentButton from "../components/TransparentButton";
import axios from 'axios';
import API_URL from "../firebase/apiLinks";

const ForgetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <KeyboardAvoidingView
                    behavior={Platform.Os === "ios" ? "padding" : "height"}
                    style={{flex: 1}}
                >
                    <View style={{marginHorizontal: 20, top: '5%', justifyContent: 'flex-end'}}>
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
                            />
                            <View style={{marginTop: 10, alignItems: 'flex-end'}}>
                                <TransparentButton
                                    style={{backgroundColor: 'rgb(38,115,226)'}}
                                    text={'Next'}
                                    onPress={() => {
                                        return new Promise((resolve, reject) => {
                                            axios.post(API_URL.FORGET_PASSWORD, {email: email})
                                                .then(res => {
                                                    navigation.replace('ForgetPasswordComplete', {email: email});
                                                    resolve();
                                                })
                                                .catch(error => {
                                                    console.log(error.response);
                                                    Alert.alert('Error', error.response.data);
                                                    reject();
                                                })
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1}}/>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
        ;
};

export default ForgetPassword;