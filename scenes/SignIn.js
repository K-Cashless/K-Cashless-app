import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {SignInButton} from '../components';
import NormalTextInput from '../components/NormalTextInput';
import * as colors from '../styles/Colors';

const SignIn = ({navigation}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={MainStyles.container}>
                <View style={styles.signInContainer}>
                    <Text style={[MainStyles.head1Text, {textAlign: 'left', paddingBottom: 50}]}>Sign In</Text>
                    <Text style={{
                        position: 'absolute',
                        top: '7%',
                        fontFamily: 'proxima-bold',
                        color: 'red',
                    }}>{errorMsg}</Text>

                    {/*Username Input*/}
                    <NormalTextInput
                        placeholder={'Email'}
                        onChangeText={(text) => {
                            setErrorMsg('');
                            setUserName(text);
                        }}
                        value={userName}
                    />

                    {/*Password Input*/}
                    <NormalTextInput
                        placeholder={'Password'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setErrorMsg('');
                            setPassword(text);
                        }}
                        value={password}
                    />

                    {/*Sign in Button*/}
                    <SignInButton
                        navigation={navigation}
                        setErrorMsg={setErrorMsg}
                        userName={userName}
                        password={password}
                    />

                    {/*Forget Password Button*/}
                    <View style={{paddingTop: 20, flexWrap: 'wrap'}}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'left',
                                flexWrap: 'wrap',
                            }}
                            onPress={() => navigation.navigate('ForgetPassword')}
                        >
                            <Text style={[MainStyles.textButton, {textAlign: 'left'}]}>Forget
                                Password?</Text>
                        </TouchableOpacity>
                    </View>


                    {/*Sign Up Section with Button*/}
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        justifyContent: 'center',
                        alignContent: 'center',
                        bottom: '20%',
                    }}>
                        <Text style={[MainStyles.bodyText, {textAlign: 'center'}]}>Don't have an account?</Text>
                        <View style={{flexWrap: 'wrap', alignSelf: 'center'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUpP1')}>
                                <Text style={[MainStyles.textButton, {textAlign: 'center', color: colors.primary}]}>Sign
                                    Up Now</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        top: '10%',
        marginHorizontal: 30,
    }
});
export default SignIn;