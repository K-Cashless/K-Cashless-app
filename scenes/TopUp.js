import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from '../components/SubScreenHeader';
import LInfoSectionTHB from '../components/LInfoSectionTHB';
import NormalTextInput from "../components/NormalTextInput";
import BlueButton from "../components/BlueButton";

const TopUp = ({navigation}) => {
    const [topUpCode, setTopUpCode] = useState('');
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{
                    marginHorizontal: 20,
                    top: '5%',
                    height: '100%',
                }}>
                    <SubScreenHeader navigation={navigation} title={'Top Up'} backButton={true}/>
                    <View style={{paddingTop: 20, paddingBottom: 50}}>
                        <LInfoSectionTHB title={'YOUR CURRENT BALANCE IS'} value={123}/>
                    </View>
                    <Text style={MainStyles.bodyText}>Please enter your top up code</Text>
                    <NormalTextInput
                        onChangeText={(text) => {
                            setTopUpCode(text);
                        }}
                        value={topUpCode}
                        placeholder={'Enter top up code'}
                    />
                    <BlueButton text={'Top Up'} onPress={() => {
                        navigation.replace('TopUpConfirm')
                    }} disable={topUpCode.length === 0}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default TopUp;