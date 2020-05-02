import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MainStyles from '../styles/MainStyles';
import * as colors from '../styles/Colors';

const NormalTextInput = ({errorStatus = null, errorRule = [], placeholder, onChangeText, value, secureTextEntry, style}) => {
    const [borderColor, setBorderColor] = useState(MainStyles.textInput.borderBottomColor);
    const [errorMsg, setErrorMsg] = useState('');
    const [firstTime, setFirstTime] = useState(true);
    const [focus, setFocus] = useState(false);
    const isError = () => {
        for (let i = 0; i < errorRule.length; ++i) {
            if (!(errorRule[i].pattern).test(value)) {
                setErrorMsg(errorRule[i].message);
                return true;
            }
        }
        setErrorMsg('');
        return false;
    };

    useEffect(() => {
        if (!firstTime && isError()) {
            setBorderColor('red');
            errorStatus && errorStatus[1](true);
        } else if (focus) {
            setBorderColor(colors.primary);
            !firstTime && errorStatus && errorStatus[1](false);
        } else {
            setBorderColor('white');
            !firstTime && errorStatus && errorStatus[1](false);
        }
    });

    return (
        <View>
            <TextInput
                multiline={false}
                keyboardAppearance='dark'
                placeholder={placeholder}
                placeholderTextColor='grey'
                secureTextEntry={secureTextEntry}
                style={[MainStyles.textInput, {marginTop: 5, borderBottomColor: borderColor}, style]}
                onFocus={() => {
                    setBorderColor(colors.primary);
                    setFocus(true);
                    setFirstTime(false);
                }}
                onBlur={() => {
                    setFocus(false);
                    setFirstTime(false);
                }}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize='none'
            />
            {
                errorMsg === '' ? null : (
                    <Text style={[MainStyles.bodyText, {marginTop: 5, color: 'red', fontSize: 15}]}>
                        {errorMsg}
                    </Text>
                )
            }

        </View>

    );
};

export default NormalTextInput;
