import React from 'react';
import {View, Text} from 'react-native';
import MainStyles from '../styles/MainStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DoneButton from '../components/DoneButton';
import {connect} from 'react-redux';

const TopUpComplete = ({navigation, balance}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center'}}>
                <View style={{flex: 1, width: '100%', top: 50}}>
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'money-check-alt'} size={100} color={'#2AC062'}/>
                        </View>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 30,
                            width: '100%',
                            textAlign: 'center',
                            flex: 0.5
                        }]}>Top Up Successful</Text>
                    </View>
                    <Text style={[MainStyles.bodyText, {flex: 1, textAlign: 'center'}]}>Your account has been topped up
                        with {'??'} {'\u0E3F'}. Your new balance is {balance} {'\u0E3F'}.</Text>
                </View>
                <View style={{width: '100%', bottom: 20}}>
                    <DoneButton navigation={navigation}/>
                </View>
            </View>
        </View>
    );
};

function mapStateToProps(state) {
    return {
        balance: state.User.balance
    }
}

export default connect(mapStateToProps)(TopUpComplete);