import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NormalTextInput from "../components/NormalTextInput";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
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

    let errorState = {
        studentID: useState(false),
        email: useState(false),
        password: useState(false),
        confirmPassword: useState(false),
    };

    const handleButtonPress = () => {
        if (errorState.studentID[0] === false &&
            errorState.email[0] === false &&
            errorState.password[0] === false &&
            errorState.confirmPassword[0] === false) {
            if (info.studentID.length > 0 &&
                info.email.length > 0 &&
                info.password.length > 0 &&
                info.confirmPassword.length > 0) {
                navigation.navigate('SignUpP2', {info: info});
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{marginHorizontal: 20, top: '5%', justifyContent: 'flex-end'}}>
                    <SubScreenHeader title={'Sign Up'} navigation={navigation} backButton={true}/>
                    <KeyboardAwareScrollView>
                        <View style={{marginTop: 20}}>
                            <Text style={[MainStyles.bodyText, {marginBottom: 20}]}>Please provide your
                                information</Text>
                            <NormalTextInput
                                placeholder={'Student ID'}
                                errorRule={[
                                    {pattern: /.{8}/, message: 'Student ID Length Must Be 8'},
                                    {pattern: /\d{8}/, message: 'Student ID Must Be Numbers Only'}
                                ]}
                                onChangeText={(text) => setInfo({...info, studentID: text})}
                                value={info.studentID}
                                errorStatus={errorState.studentID}
                            />
                            <NormalTextInput
                                placeholder={'Email'}
                                errorRule={[
                                    {
                                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Incorrect Email Format'
                                    },
                                    {pattern: /^\w+([.-]?\w+)*@kmitl.ac.th/, message: 'KMITL Email Only'},
                                ]}
                                onChangeText={(text) => setInfo({...info, email: text})}
                                value={info.email}
                                errorStatus={errorState.email}
                            />
                            <NormalTextInput
                                placeholder={'Password'}
                                errorRule={[
                                    {pattern: /.+/, message: 'Password Can\'t Be Empty'},
                                    {pattern: new RegExp(info.confirmPassword, 'g'), message: 'Password Did Not Match'},
                                ]}
                                onChangeText={(text) => setInfo({...info, password: text})}
                                value={info.password}
                                secureTextEntry={true}
                                errorStatus={errorState.password}
                            />
                            <NormalTextInput
                                placeholder={'Confirm Password'}
                                errorRule={[
                                    {pattern: /.+/, message: 'Confirm Password Can\'t Be Empty'},
                                    {pattern: new RegExp(info.password, 'g'), message: 'Password Did Not Match'},
                                ]}
                                onChangeText={(text) => setInfo({...info, confirmPassword: text})}
                                value={info.confirmPassword}
                                secureTextEntry={true}
                                errorStatus={errorState.confirmPassword}
                            />
                            <TransparentButton text={'Next'} onPress={handleButtonPress}/>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default SignUpP1;