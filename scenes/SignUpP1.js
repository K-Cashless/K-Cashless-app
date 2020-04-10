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
    const [errorMsg, setErrorMsg] = useState(' ');
    const handleButtonPress = () => {
        if (info.studentID.length === 0 ||
            info.email.length === 0 ||
            info.password.length === 0 ||
            info.confirmPassword.length === 0
        ) setErrorMsg('Incomplete Field');
        else if (info.password !== info.confirmPassword) setErrorMsg('Password and Confirm Password don\'t match.');
        else {
            setErrorMsg(' ');
            navigation.navigate('SignUpP2', {info: info});
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
                            <Text style={[MainStyles.bodyText, {color: 'red', fontSize: 15}]}>
                                {errorMsg}
                            </Text>
                            <NormalTextInput
                                placeholder={'Student ID'}
                                onChangeText={(text) => setInfo({...info, studentID: text})}
                                value={info.studentID}
                            />
                            <NormalTextInput
                                placeholder={'Email'}
                                onChangeText={(text) => setInfo({...info, email: text})}
                                value={info.email}
                            />
                            <NormalTextInput
                                placeholder={'Password'}
                                onChangeText={(text) => setInfo({...info, password: text})}
                                value={info.password}
                                secureTextEntry={true}
                            />
                            <NormalTextInput
                                placeholder={'Confirm Password'}
                                onChangeText={(text) => setInfo({...info, confirmPassword: text})}
                                value={info.confirmPassword}
                                secureTextEntry={true}
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