import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MainStyles from '../styles/MainStyles';
import SignInButton from '../components/SignInButton';
import * as colors from '../styles/Colors';

const SignIn = ({navigation}) => {
    const [userNameBorderColor, setUserNameBorderColor] = useState(MainStyles.textInput.borderBottomColor);
    const [passwordBorderColor, setPasswordBorderColor] = useState(MainStyles.textInput.borderBottomColor);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={MainStyles.container}>
            <View style={styles.signInContainer}>
                <Text style={[MainStyles.head1Text, {textAlign: 'left'}]}>Sign in</Text>
                {/*Username Input*/}
                <TextInput
                    multiline={false}
                    keyboardAppearance='dark'
                    placeholder="Username or email"
                    placeholderTextColor='grey'
                    style={[MainStyles.textInput, {marginTop: 30, borderBottomColor: userNameBorderColor}]}
                    onFocus={() => {
                        setUserNameBorderColor(colors.primary);
                    }}
                    onBlur={() => {
                        setUserNameBorderColor('white');
                    }}
                    onChangeText={(text) => {
                        setUserName(text)
                    }}
                    value={userName}
                    autoCapitalize='none'
                />
                {/*Password Input*/}
                <TextInput
                    multiline={false}
                    keyboardAppearance='dark'
                    placeholder="Password"
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                    style={[MainStyles.textInput, {marginTop: 5}, {borderBottomColor: passwordBorderColor}]}
                    onFocus={() => {
                        setPasswordBorderColor(colors.primary);
                    }}
                    onBlur={() => {
                        setPasswordBorderColor('white');
                    }}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    value={password}
                    autoCapitalize='none'
                />
                {/*Sign in Button*/}
                <SignInButton
                    navigation={navigation}
                    userName={userName}
                    password={password}
                />

                {/*Forget Password Button*/}
                <TouchableOpacity style={{
                    paddingTop: 20,
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'white',
                        fontWeight: 'bold',
                    }}>Forget Password?</Text>
                </TouchableOpacity>

                {/*Sign Up Section with Button*/}
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    bottom: '25%',
                }}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 16,
                    }}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={{
                            fontSize: 18,
                            color: colors.primary,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}>Sign Up Now</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        top: 150,
        marginHorizontal: 30,
    }
});
export default SignIn;