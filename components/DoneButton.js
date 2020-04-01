import React from 'react';
import BlueButton from '../components/BlueButton';

const DoneButton = ({navigation}) => {
    return (
        <BlueButton text="Done" onPress={() => {
            navigation.navigate('MainApp');
        }}/>
    );
};

export default DoneButton;