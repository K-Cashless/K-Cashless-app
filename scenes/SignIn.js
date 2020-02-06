import React from 'react';
import { View, Text, TouchableOpacity , StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MainStyles from '../styles/MainStyles';
import TextField from '../components/TextField';

export default function Login({ navigation }){
    return(
        <View style = {MainStyles.container}>
            <View style = {styles.signInContainer}>
                <Text style = {MainStyles.head1Text}>Sign In</Text>
                
                <TextField
                style = {{marginTop: 30}}
                placeholder = "Username or email"/>
                <TextField
                style = {{marginTop: 0}}
                secureTextEntry = {true}
                placeholder = "Password"/>
                
                <View style = {styles.buttonAlign}>
                    <TouchableOpacity
                    style = {styles.buttonContainer}
                    onPress = {() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    signInContainer:{
        position: "absolute",
        top: 50,
        margin: '10%', 
        width:'80%',
    },
    buttonContainer:{
        height: 50,
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'rgb(246,136,12)',
        justifyContent: 'center',
    },
    buttonAlign:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});