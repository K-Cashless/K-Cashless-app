import React from 'react';
import {Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DoneButton from '../components/DoneButton';
import {connect} from 'react-redux';

const RedeemPointComplete = ({navigation, User}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center'}}>
                <View style={{flex: 1, width: '100%', top: 50}}>
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'check-circle'} size={100} color={'#2AC062'}/>
                        </View>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 30,
                            width: '100%',
                            textAlign: 'center',
                            flex: 0.5
                        }]}>Redeem Point Successful</Text>
                    </View>
                    <Text style={[MainStyles.bodyText, {flex: 1, textAlign: 'center'}]}>
                        You've redeem {123} points, earned {123} {'\u0E3F'}.{'\n'}
                        Your new balance is {User.balance} {'\u0E3F'}.
                    </Text>
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
        User: {
            balance: state.User.balance,
            kpoints: state.User.kpoints
        }
    }
}

export default connect(mapStateToProps)(RedeemPointComplete);