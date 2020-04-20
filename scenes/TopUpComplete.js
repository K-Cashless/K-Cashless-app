import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DoneButton from '../components/DoneButton';
import {connect} from 'react-redux';
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import * as actions from '../actions';

const TopUpComplete = ({navigation, User}) => {
    const topUpValue = navigation.getParam('topUpValue', '??');
    useEffect(() => {
        (async () => {
            await axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + User.token}})
                .then(res => {
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
                        with {topUpValue} {'\u0E3F'}. Your new balance is {User.balance} {'\u0E3F'}.</Text>
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
        User: state.User
    }
}

export default connect(mapStateToProps)(TopUpComplete);