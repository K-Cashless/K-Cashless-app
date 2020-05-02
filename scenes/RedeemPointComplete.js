import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DoneButton from '../components/DoneButton';
import {connect} from 'react-redux';
import store from '../store';
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import * as actions from '../actions';

const RedeemPointComplete = ({navigation, User}) => {
    const info = navigation.getParam('info', {});
    useEffect(() => {
        (async () => {
            await axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                .then(res => {
                    console.log(res);
                    store.dispatch(actions.User.setId(res.data[0].userId));
                    store.dispatch(actions.User.setFirstName(res.data[0].firstName));
                    store.dispatch(actions.User.setLastName(res.data[0].lastName));
                    store.dispatch(actions.User.setBalance(res.data[0].deposit));
                    store.dispatch(actions.User.setKpoints(res.data[0].point));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));
                })
                .catch(error => {
                    Alert.alert('Error Updating K Point');
                    console.log(error);
                });
        })();
    }, []);
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
                        You've redeemed {info.redeemed} points, earned {info.earned} {'\u0E3F'}.{'\n'}
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