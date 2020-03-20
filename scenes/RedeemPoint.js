import React, {useState} from 'react';
import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import MainStyles from "../styles/MainStyles";
import SubScreenHeader from "../components/SubScreenHeader";
import KPointRect from "../components/KPointRect";
import NumberTextInput from "../components/NumberTextInput";

const RedeemPoint = ({navigation}) => {
    const [redeemValue, setRedeemValue] = useState('');
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{
                    marginHorizontal: 20,
                    top: '5%',
                }}>
                    <SubScreenHeader navigation={navigation} title={'Redeem Points'} backButton={true}/>
                    <KPointRect style={{top: 10}} point={100}/>
                    <Text style={[MainStyles.bodyText, {top: 20}]}>25 Points = 1 THB</Text>
                    <View style={{top: 50}}>
                        <Text style={MainStyles.head2Text}>POINTS TO REDEEM</Text>
                        <NumberTextInput
                            style={{fontSize: 50, textAlign: 'right'}}
                            onChangeText={(text) => {
                                setRedeemValue(text);
                            }}
                            value={redeemValue}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};

export default RedeemPoint;