import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MainStyles from '../styles/MainStyles';
import * as colors from '../styles/Colors';

const NormalTextInput = ({errorStatus = null, errorRule = [], placeholder, onChangeText, value, secureTextEntry, style}) => {
    const [borderColor, setBorderColor] = useState(MainStyles.textInput.borderBottomColor);
    const [errorMsg, setErrorMsg] = useState('');
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
                    setErrorMsg('');
                }}
                onBlur={() => {
                    if (isError()) {
                        setBorderColor('red');
                        if (errorStatus !== null) errorStatus[1](true);
                    } else {
                        setBorderColor('white');
                        if (errorStatus !== null) errorStatus[1](false);
                    }
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
