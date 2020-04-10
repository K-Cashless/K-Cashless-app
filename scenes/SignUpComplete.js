import React from 'react';
import {Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import MainStyles, {BlueButton as BlueButtonStyle} from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import Icon from 'react-native-vector-icons/FontAwesome5';

const SignUpComplete = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{marginHorizontal: 20, top: '5%', justifyContent: 'flex-end'}}>
                    <SubScreenHeader title={'Sign Up'} navigation={navigation} backButton={false}/>
                    <View style={{marginTop: 20}}>
                        <View style={{alignItems: 'center'}}>
                            <Icon name={'check-circle'} size={70} color={'#2AC062'}/>
                            <Text style={[MainStyles.head2Text, {fontSize: 25, marginVertical: 20}]}>
                                Sign Up Complete
                            </Text>
                        </View>
                        <Text style={[MainStyles.bodyText, {marginBottom: 20, textAlign: 'center'}]}>
                            Your account is waiting for confirmation.
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1, marginHorizontal: 20}}>
                    <DoneButton navigation={navigation}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
        ;
};

const DoneButton = ({navigation}) => {
    return (
        <View style={BlueButtonStyle.buttonAlign}>
            <TouchableOpacity
                style={BlueButtonStyle.buttonContainer}
                onPress={async () => {
                    navigation.replace('SignIn');
                }}
            >
                <Text style={[BlueButtonStyle.buttonText, {color: 'white'}]}>
                    Done
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default SignUpComplete;