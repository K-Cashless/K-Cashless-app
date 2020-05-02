import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NormalTextInput from "../components/NormalTextInput";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TransparentButton from "../components/TransparentButton";


const SignUpP1 = ({navigation}) => {
    const [info, setInfo] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        studentID: '',
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [allowProceed, setAllowProceed] = useState(false);

    let errorState = {
        studentID: useState(true),
        email: useState(true),
        password: useState(true),
        confirmPassword: useState(true),
    };

    useEffect(() => {
        setAllowProceed(
            errorState.studentID[0] === false &&
            errorState.email[0] === false &&
            errorState.password[0] === false &&
            errorState.confirmPassword[0] === false
        );
    });

    const handleButtonPress = () => {
        return new Promise((resolve) => {
            Keyboard.dismiss;
            navigation.navigate('SignUpP2', {info: info});
            resolve();
        });
    };

    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView>
                    <View style={{marginHorizontal: 20, marginTop: '10%', justifyContent: 'flex-start'}}>
                        <SubScreenHeader title={'Sign Up'} navigation={navigation} backButton={true}/>
                        <View style={{marginTop: 20}}>
                            <Text style={[MainStyles.bodyText, {marginBottom: 20}]}>Please provide your
                                information</Text>
                            <NormalTextInput
                                placeholder={'Student ID*'}
                                errorRule={[
                                    {pattern: /^.{8}$/, message: 'Student ID Must Be 8 Digits Long'},
                                    {pattern: /^\d{8}$/, message: 'Student ID Must Be Numbers Only'}
                                ]}
                                onChangeText={(text) => setInfo({...info, studentID: text})}
                                value={info.studentID}
                                errorStatus={errorState.studentID}
                            />
                            <NormalTextInput
                                placeholder={'Email*'}
                                errorRule={[
                                    {
                                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Incorrect Email Format'
                                    },
                                    {pattern: /^\w+([.-]?\w+)*@kmitl.ac.th$/, message: 'KMITL Email Only'},
                                ]}
                                onChangeText={(text) => setInfo({...info, email: text})}
                                value={info.email}
                                errorStatus={errorState.email}
                            />
                            <NormalTextInput
                                placeholder={'Password*'}
                                errorRule={[
                                    {pattern: /.+/, message: 'Password Can\'t Be Empty'},
                                    {pattern: /.{6,}/, message: 'Password must be at least 6 characters long'},
                                    {pattern: new RegExp(info.confirmPassword, 'g'), message: 'Password Did Not Match'},
                                ]}
                                onChangeText={(text) => setInfo({...info, password: text})}
                                value={info.password}
                                secureTextEntry={true}
                                errorStatus={errorState.password}
                            />
                            <NormalTextInput
                                placeholder={'Confirm Password*'}
                                errorRule={[
                                    {pattern: /.+/, message: 'Confirm Password Can\'t Be Empty'},
                                    {pattern: new RegExp(info.password, 'g'), message: 'Password Did Not Match'},
                                ]}
                                onChangeText={(text) => setInfo({...info, confirmPassword: text})}
                                value={info.confirmPassword}
                                secureTextEntry={true}
                                errorStatus={errorState.confirmPassword}
                            />
                            <TransparentButton
                                text={'Next'}
                                disabled={!allowProceed}
                                style={{backgroundColor: allowProceed ? 'rgb(38,115,226)' : 'rgb(150,150,150)'}}
                                onPress={handleButtonPress}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </View>
    )
};

export default SignUpP1;