import React, {useState} from 'react';
import {Alert, Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {BallIndicator} from "react-native-indicators";
import API_URL from '../firebase/apiLinks';
import * as actions from '../actions';
import store from '../store';
import {getAllUserData} from '../firebase/functions';

const SignInButton = ({navigation, email, password}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(styles.buttonContainer);

    function signIn(email, password) {
        return axios.post(API_URL.SIGN_IN, {email: email, password: password});
    }

    const onPressAction = () => {
        setIsLoading(true);
        setButtonStyle(styles.buttonContainerOutline);
        Keyboard.dismiss();
        signIn(email, password)
            .then(res => {
                store.dispatch(actions.User.setToken(res.data.token));
                getAllUserData()
                    .then(() => {
                        const infoToSend = {device: store.getState().ExpoPushToken};
                        console.log(infoToSend);
                        axios.post(API_URL.PUSH_NOTIFICATION_TOKEN, infoToSend, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                            .then(res => {
                                console.log(res);
                                setButtonStyle(styles.buttonContainer);
                                setIsLoading(false);
                                navigation.navigate('App');
                            })
                            .catch(error => {
                                setButtonStyle(styles.buttonContainer);
                                setIsLoading(false);
                                console.log("expoPushToken", error.response);
                                Alert.alert('Error', 'Please Try Again');
                            })
                    })
                    .catch(error => {
                        setButtonStyle(styles.buttonContainer);
                        setIsLoading(false);
                        console.log(error.response);
                        Alert.alert('Error', 'Please Try Again');
                    });
            })
            .catch(error => {
                setButtonStyle(styles.buttonContainer);
                setIsLoading(false);
                console.log(error.response);
                Alert.alert('Error', 'Please Try Again');
            });
    };

    return (
        <View style={styles.buttonAlign}>
            <TouchableOpacity
                style={buttonStyle}
                onPress={onPressAction}
                disabled={isLoading}>
                <Text style={styles.buttonText}>
                    {isLoading ? 'Signing In' : 'Sign In'}
                </Text>
            </TouchableOpacity>
            {isLoading ? (
                <View style={{
                    position: 'absolute',
                    right: 30,
                }}>
                    <BallIndicator color={'white'} size={20}/>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        right: 20,
    },
    buttonContainer: {
        height: 50,
        width: '100%',
        borderRadius: 3,
        backgroundColor: 'rgb(246,136,12)',
        justifyContent: 'center',
    },
    buttonContainerOutline: {
        height: 50,
        width: '100%',
        borderRadius: 3,
        borderWidth: 3,
        borderColor: 'rgb(246,136,12)',
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
    },
    buttonContainerFailedOutline: {
        height: 50,
        width: '100%',
        borderRadius: 3,
        borderWidth: 5,
        borderColor: 'red',
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
    },
    buttonAlign: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText: {
        fontFamily: 'proxima-bold',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    error: {
        fontFamily: 'proxima-bold',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});


export default SignInButton;