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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BallIndicator} from "react-native-indicators";

const ForgetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
                                style={{marginBottom: 20}}
                            />
                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableHighlight
                                    underlayColor='rgba(150,150,150,0.5)'
                                    onPress={() => {
                                        setIsLoading(false);
                                        navigation.replace('ForgetPasswordComplete');
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