import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {BallIndicator} from "react-native-indicators";
import API_URL from '../firebase/apiLinks';
import * as actions from '../actions';
import store from '../store';

// store.dispatch(actions.User.setId('61010000'));
// store.dispatch(actions.User.setName('Mickey Mouse'));
// store.dispatch(actions.User.setBalance(100));
// store.dispatch(actions.User.setKpoints(100));
// store.dispatch(actions.User.setPic('https://www.ixxiyourworld.com/media/1676571/Mickey-Mouse-2.jpg?mode=crop&width=562&height=613'));
// navigation.navigate('App');


// const errorMessageInterpreter = (message) => {
//     switch (message){
//         case message === ''
//     }
//
// };


const SignInButton = ({navigation, email, password}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(styles.buttonContainer);

    function signIn(email, password) {
        return axios.post(API_URL.SIGN_IN, {email: email, password: password});
    }

    const onPressAction = () => {
        setIsLoading(true);
        setButtonStyle(styles.buttonContainerOutline);
        signIn(email, password)
            .then(res => {
                console.log('Success');
                store.dispatch(actions.User.setToken(res.data.token));

                store.dispatch(actions.User.setId('61010000'));
                store.dispatch(actions.User.setName('Mickey Mouse'));
                store.dispatch(actions.User.setBalance(100));
                store.dispatch(actions.User.setKpoints(100));
                store.dispatch(actions.User.setPic('https://www.ixxiyourworld.com/media/1676571/Mickey-Mouse-2.jpg?mode=crop&width=562&height=613'));

                setButtonStyle(styles.buttonContainer);
                setIsLoading(false);
                navigation.navigate('App');
            })
            .catch(error => {
                setButtonStyle(styles.buttonContainer);
                setIsLoading(false);
                console.log(error);
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