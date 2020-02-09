import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SwitchActions } from 'react-navigation';

const SignInButton = ({ navigation, userName, password }) => {
    var isLoading = false;
    const onPressAction = () => {  
        isLoading = true;
        // WIP Authentication
        console.log("Signed in");
        console.log(userName);
        console.log(password);
        const routeName = 'App';
        navigation.dispatch(SwitchActions.jumpTo({ routeName }))
        isLoading = false;
    }
    return (
        <View style={styles.buttonAlign}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onPressAction}
                disabled = {isLoading}>
                <Text style={styles.buttonText}>Sign in</Text>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='small' color='white' />
                    </View>
                ):(
                    null
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        position: 'absolute',
        right: 20,
    },
    buttonContainer: {
        height: 50,
        width: '100%',
        borderRadius: 5,
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
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})

export default SignInButton;