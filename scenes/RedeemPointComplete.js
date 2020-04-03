import React from 'react';
import {View, Text} from 'react-native';
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
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name={'check-circle'} size={100} color={'#2AC062'}/>
                        </View>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 30,
                            width: '100%',
                            textAlign: 'center',
                            flex: 0.5
                        }]}>Redeem
                            Point Successful</Text>
                    </View>

                    <View style={{flex: 2, width: '100%', top: 50}}>
                        <Text style={MainStyles.head2Text}>YOUR BALANCE IS</Text>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 50,
                            textAlign: 'right',
                            justifyContent: 'center',
                            paddingBottom: 20,
                        }]}>{User.balance} <Text style={{fontSize: 30}}>{'\u0E3F'}</Text></Text>
                        <Text style={[MainStyles.head2Text]}>YOUR K
                            POINT BALANCE IS</Text>
                        <Text style={[MainStyles.head2Text, {
                            fontSize: 50,
                            textAlign: 'right',
                            justifyContent: 'center'
                        }]}>{User.kpoints} <Text style={{fontSize: 30}}>Points</Text></Text>
                    </View>
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