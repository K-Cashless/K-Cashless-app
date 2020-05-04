import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MainStyles from '../styles/MainStyles';
import * as colors from '../styles/Colors';

const NumberTextInput = ({placeholder, onChangeText, value, secureTextEntry, style, error, editable, onBlur}) => {
    const [borderColor, setBorderColor] = useState(MainStyles.textInput.borderBottomColor);
    useEffect(() => {
        if (error) setBorderColor('red');
        else setBorderColor('white');
    });

    return (
        <View>
            <TextInput
                editable={editable}
                multiline={false}
                keyboardAppearance='dark'
                placeholder={placeholder}
                placeholderTextColor='grey'
                secureTextEntry={secureTextEntry}
                returnKeyType='done'
                style={[MainStyles.textInput, {marginTop: 5, borderBottomColor: borderColor}, style]}
                onFocus={() => {
                    setBorderColor(colors.primary);
                }}
                onBlur={onBlur}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize='none'
                keyboardType={'numeric'}
            />
        </View>

    );
};

export default NumberTextInput;
