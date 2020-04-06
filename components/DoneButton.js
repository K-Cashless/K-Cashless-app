import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BlueButton as BlueButtonStyle} from '../styles/MainStyles';

const DoneButton = ({navigation}) => {
    let buttonStyle = BlueButtonStyle.buttonContainer;
    let buttonTextColor = 'white';
    return (
        <View style={BlueButtonStyle.buttonAlign}>
            <TouchableOpacity
                style={buttonStyle}
                onPress={async () => {
                    navigation.navigate('MainApp');
                }}
            >
                <Text style={[BlueButtonStyle.buttonText, {color: buttonTextColor}]}>
                    Done
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default DoneButton;