import React from 'react';
import {Text, View} from 'react-native';
import MainStyles from "../styles/MainStyles";
import SubScreenHeader from "../components/SubScreenHeader";
import KPointRect from "../components/KPointRect";

const RedeemPoint = ({navigation}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{
                marginHorizontal: 20,
                top: '5%'
            }}>
                <SubScreenHeader title={'Redeem Points'} backButton={true}/>
                <View style={{marginTop: '5%'}}>
                    <KPointRect point={100}/>
                </View>
            </View>
        </View>
    );
};

export default RedeemPoint;