import React from 'react';
import {View, Text} from 'react-native';
import MainStyles from '../styles/MainStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DoneButton from '../components/DoneButton';

const TopUpComplete = ({navigation}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center'}}>
                <View style={{flex: 1, width: '100%', top: 50}}>
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'check-circle'} size={100} color={'#2AC062'}/>
                        </View>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 30,
                            width: '100%',
                            textAlign: 'center',
                            flex: 0.5
                        }]}>Top Up Successful</Text>
                    </View>

                    <View style={{flex: 2, width: '100%', top: 50}}>
                        <Text style={MainStyles.head2Text}>YOUR NEW BALANCE IS</Text>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 50,
                            textAlign: 'right',
                            justifyContent: 'center',
                            paddingBottom: 20,
                        }]}>123 <Text style={{fontSize: 30}}>{'\u0E3F'}</Text></Text>
                    </View>
                </View>
                <View style={{width: '100%', bottom: 20}}>
                    <DoneButton navigation={navigation}/>
                </View>
            </View>
        </View>
    );
};

export default TopUpComplete;