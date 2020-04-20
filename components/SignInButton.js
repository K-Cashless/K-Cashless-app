import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {BallIndicator} from "react-native-indicators";
import API_URL from '../firebase/apiLinks';
import * as actions from '../actions';
import store from '../store';


const SignInButton = ({navigation, email, password}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(styles.buttonContainer);

    function signIn(email, password) {
        return axios.post(API_URL.SIGN_IN, {email: email, password: password});
    }

    function getUserData(token) {
        return axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + token}})
    }

    const onPressAction = () => {
        setIsLoading(true);
        setButtonStyle(styles.buttonContainerOutline);
        let tempToken = '';
        signIn(email, password)
            .then(res => {
                store.dispatch(actions.User.setToken(res.data.token));
                tempToken = res.data.token;
            })
            .then(() => {
                getUserData(tempToken)
                    .then(res => {
                        console.log(res.data[0]);
                        store.dispatch(actions.User.setId(res.data[0].userId));
                        store.dispatch(actions.User.setFirstName(res.data[0].firstName));
                        store.dispatch(actions.User.setLastName(res.data[0].lastName));
                        store.dispatch(actions.User.setBalance(res.data[0].deposit));
                        store.dispatch(actions.User.setKpoints(res.data[0].point));
                        store.dispatch(actions.User.setEmail(res.data[0].email));
                        store.dispatch(actions.User.setPhone(res.data[0].phone));
                        store.dispatch(actions.User.setPic('https://www.ixxiyourworld.com/media/1676571/Mickey-Mouse-2.jpg?mode=crop&width=562&height=613'));
                    })
                    .catch(error => {
                        console.log('FAILED');
                        setButtonStyle(styles.buttonContainer);
                        setIsLoading(false);
                        console.log(error.response);
                        Alert.alert('Error Getting User Data', error.response.message);
                    });
            })
            .then(() => {
                setButtonStyle(styles.buttonContainer);
                setIsLoading(false);
                navigation.navigate('App');
            })
            .catch(error => {
                setButtonStyle(styles.buttonContainer);
                setIsLoading(false);
                console.log(error.response);
                Alert.alert('Error', error.response.data.message);
            })
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