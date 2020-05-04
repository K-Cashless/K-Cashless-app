import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {SignInButton} from '../components';
import NormalTextInput from '../components/NormalTextInput';
import * as colors from '../styles/Colors';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={MainStyles.container}>
                <View style={styles.signInContainer}>
                    <Text style={[MainStyles.head1Text, {textAlign: 'left', paddingBottom: 50}]}>Sign In</Text>

                    {/*Username Input*/}
                    <NormalTextInput
                        placeholder={'Email'}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />

                    {/*Password Input*/}
                    <NormalTextInput
                        placeholder={'Password'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        value={password}
                    />

                    {/*Sign in Button*/}
                    <SignInButton
                        navigation={navigation}
                        email={email}
                        password={password}
                    />

                    {/*Forget Password Button*/}
                    <View style={{paddingTop: 20, flexWrap: 'wrap'}}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'flex-start',
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
                        width: '100%',
                        justifyContent: 'center',
                        alignContent: 'center',
                        marginTop: 30
                    }}>
                        <Text style={[MainStyles.bodyText, {textAlign: 'left'}]}>Don't have an account?</Text>
                        <View style={{flexWrap: 'wrap', alignSelf: 'flex-start'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUpP1')}>
                                <Text style={[MainStyles.textButton, {textAlign: 'left', color: colors.primary}]}>Sign
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