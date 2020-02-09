import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MainStyles from '../styles/MainStyles';
import SignInButton from '../components/SignInButton';

const SignIn = ({ navigation }) => {
    const [userNameBorderColor, setUserNameBorderColor] = useState(MainStyles.textInput.borderBottomColor);
    const [passwordBorderColor, setPasswordBorderColor] = useState(MainStyles.textInput.borderBottomColor);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={MainStyles.container}>
            <View style={styles.signInContainer}>
                <Text style={MainStyles.head1Text}>Sign in</Text>
                <TextInput
                    multiline={false}
                    keyboardAppearance='dark'
                    placeholder="Username or email"
                    placeholderTextColor='grey'
                    style={[MainStyles.textInput, { marginTop: 30, borderBottomColor: userNameBorderColor }]}
                    onFocus={() => { setUserNameBorderColor('#4287f5'); }}
                    onBlur={() => { setUserNameBorderColor('white'); }}
                    onChangeText={(text) => { setUserName(text) }}
                    value={userName}
                    autoCapitalize='none'
                />
                <TextInput
                    multiline={false}
                    keyboardAppearance='dark'
                    placeholder="Password"
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                    style={[MainStyles.textInput, { marginTop: 5 }, { borderBottomColor: passwordBorderColor }]}
                    onFocus={() => { setPasswordBorderColor('#4287f5'); }}
                    onBlur={() => { setPasswordBorderColor('white'); }}
                    onChangeText={(text) => { setPassword(text) }}
                    value={password}
                    autoCapitalize='none'
                />
                <SignInButton
                    navigation={navigation}
                    userName={userName}
                    password={password}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    signInContainer: {
        position: "absolute",
        top: 50,
        margin: '10%',
        width: '80%',
    }
});
export default SignIn;