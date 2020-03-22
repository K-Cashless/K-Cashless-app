import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BallIndicator} from "react-native-indicators";
import {BlueButton as BlueButtonStyle} from '../styles/MainStyles';

const BlueButton = ({disable, onPress, text}) => {
    const [isLoading, setIsLoading] = useState(false);
    let buttonStyle = BlueButtonStyle.buttonContainer;
    let buttonTextColor = 'white';
    if (disable) {
        buttonStyle = BlueButtonStyle.buttonContainerDisable;
        buttonTextColor = 'rgba(255,255,255,0.5)';
    } else if (isLoading) {
        buttonStyle = BlueButtonStyle.buttonContainerOutline;
    }
    return (
        <View style={BlueButtonStyle.buttonAlign}>
            <TouchableOpacity
                style={buttonStyle}
                onPress={async () => {
                    setIsLoading(true);
                    onPress();
                }}
                disabled={disable}>
                <Text style={[BlueButtonStyle.buttonText, {color: buttonTextColor}]}>
                    {isLoading ? ('Processing...') : text}
                </Text>
            </TouchableOpacity>
            {isLoading ? (
                <View style={{
                    position: 'absolute',
                    right: 30,
                }}>
                    <BallIndicator color={'rgb(38,115,226)'} size={20}/>
                </View>) : null}
        </View>
    );
};

export default BlueButton;