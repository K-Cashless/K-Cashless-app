import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {SwitchActions} from 'react-navigation';
import * as firebase from 'firebase';

const SignInButton = ({navigation, userName, password}) => {
    const [isLoading, setIsLoading] = useState(false);

    function signIn(userName, password) {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(userName, password)
                .then(res => {
                    console.log(res.user.email);
                    setIsLoading(false);
                })
                .then(res => {
                    const routeName = 'App';
                    navigation.dispatch(SwitchActions.jumpTo({routeName}));
                });
        } catch (error) {
            console.log(error.toString());
            setIsLoading(false);
        }
    }

    const onPressAction = () => {
        setIsLoading(true);
        signIn(userName, password);
    };

    return (
        <View style={styles.buttonAlign}>
            <TouchableOpacity
                style={[styles.buttonContainer]}
                onPress={onPressAction}
                disabled={isLoading}>
                <Text style={styles.buttonText}>
                    {isLoading ? 'Signing In' : 'Sign In'}
                </Text>
            </TouchableOpacity>
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
    }
});

export default SignInButton;