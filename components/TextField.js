import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import MainStyles from '../styles/MainStyles';

const TextField = ({ enteredText ,secureTextEntry, style ,placeholder}) => {
    return (
        <TextInput
            multiline={false}
            keyboardAppearance='dark'
            placeholder={placeholder}
            placeholderTextColor='grey'
            secureTextEntry = {secureTextEntry}
            style= {[MainStyles.textInput,style]}
        />
    )
}

export default TextField;