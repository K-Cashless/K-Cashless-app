import React, {useState} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NormalTextInput from "../components/NormalTextInput";
import {BallIndicator} from "react-native-indicators";
import Icon from "react-native-vector-icons/FontAwesome5";


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
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(' ');
    const NextButton = () => {
        return (
            <View style={{marginTop: 20, alignItems: 'flex-end'}}>
                <TouchableHighlight
                    underlayColor='rgba(150,150,150,0.5)'
                    onPress={() => {
                        setIsLoading(false);
                        if (info.studentID.length === 0 ||
                            info.email.length === 0 ||
                            info.password.length === 0 ||
                            info.confirmPassword.length === 0
                        ) setErrorMsg('Incomplete Field');
                        else if (info.password !== info.confirmPassword) setErrorMsg('Password and Confirm Password don\'t match.');
                        else setErrorMsg(' ');
                    }}
                    style={{
                        width: 100,
                        height: 40,
                        borderRadius: 80,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {
                        isLoading ? (
                            <BallIndicator color={'white'} size={20}/>
                        ) : (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: 'proxima-bold',
                                    fontSize: 20,
                                    color: 'white'
                                }}>Next</Text>
                                <Icon name={'chevron-right'} size={20} color={'white'}
                                      style={{marginLeft: 7}}/>
                            </View>
                        )
                    }
                </TouchableHighlight>
            </View>
        )
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <KeyboardAvoidingView
                    behavior={Platform.Os === "ios" ? "padding" : "height"}
                    style={{flex: 1}}
                >
                    <View style={{marginHorizontal: 20, top: '5%', justifyContent: 'flex-end'}}>
                        <SubScreenHeader title={'Sign Up'} navigation={navigation} backButton={true}/>
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
                            <NextButton/>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default SignUpP1;