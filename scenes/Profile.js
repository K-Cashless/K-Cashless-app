import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import * as colors from '../styles/Colors';
import {connect} from 'react-redux'
import SubScreenHeader from "../components/SubScreenHeader";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as actions from '../actions';
import store from '../store';
import axios from 'axios';
import API_URL from '../firebase/apiLinks';

const Profile = ({navigation, User}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, alignItems: 'center'}}>
                <View style={{top: '10%', width: '100%'}}>
                    <SubScreenHeader navigation={navigation} title={'Profile'} backButton={true}/>
                    <View style={{marginTop: 20}}>
                        <ProfileCard User={User}/>
                        <ManageAccountButton navigation={navigation}/>
                    </View>
                </View>
            </View>
            <SignOutButton navigation={navigation}/>
        </View>
    )
};

const ProfileCard = ({User}) => {
    return (
        <View style={{
            backgroundColor: colors.primary,
            width: '100%',
            height: 150,
            borderRadius: 5
        }}>
            <View style={{
                padding: 20,
                borderRadius: 5,
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                    <View style={{width: 60, height: 60, borderRadius: 80, backgroundColor: 'white'}}>
                        {
                            User.pic &&
                            <Image source={{uri: User.pic}} style={{width: 60, height: 60, borderRadius: 80}}
                                   resizeMode='cover'/>
                        }
                    </View>

                </View>

                <View style={{flex: 3, marginLeft: 20, height: 110, justifyContent: 'flex-start'}}>
                    <Text style={{
                        fontFamily: 'proxima-bold',
                        fontSize: 18,
                        color: 'white',
                    }}>{User.firstName} {User.lastName}</Text>
                    <Text style={{
                        fontFamily: 'proxima-regular',
                        fontSize: 18,
                        color: 'white',
                    }}>{User.email}</Text>
                    <View style={{flex: 1, marginTop: 10}}>
                        <Text style={{
                            fontFamily: 'proxima-bold',
                            fontSize: 25,
                            color: 'white',
                            textAlign: 'right'
                        }}>{User.balance.toFixed(2)} {'\u0E3F'}</Text>
                    </View>
                    <Text style={{
                        fontFamily: 'proxima-regular',
                        fontSize: 18,
                        color: 'white',
                        textAlign: 'right'
                    }}>{User.kpoints} Points</Text>
                </View>
            </View>
        </View>

    )
};

const ManageAccountButton = ({navigation}) => {
    return (
        <TouchableOpacity
            style={{flexDirection: 'row', marginTop: 50, width: '100%', height: 50, alignItems: 'center'}}
            onPress={() => navigation.navigate('ManageAccount')}
        >
            <View>
                <Text style={[MainStyles.head2Text, {fontSize: 20}]}>
                    Manage Account
                </Text>
            </View>
            <Icon name={'angle-right'} size={25} color={'white'} style={{position: 'absolute', right: 0}}/>
        </TouchableOpacity>
    )
};

const SignOutButton = ({navigation}) => {
    return (
        <TouchableOpacity
            style={{position: 'absolute', bottom: 50, width: '100%'}}
            onPress={async () => {
                await axios.post(API_URL.SIGN_OUT, {}, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                    .then(res => {
                        console.log(res);
                        store.dispatch(actions.User.clearAllUser());
                        navigation.navigate('SignIn');
                    })
                    .catch(error => {
                        console.log(error.response);
                        Alert.alert('Error Signing Out', 'Please Try Again');
                    });
            }}
        >
            <Text style={[MainStyles.head2Text, {fontSize: 20, textAlign: 'center', color: 'red'}]}>
                Sign Out
            </Text>
        </TouchableOpacity>
    );
};

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(Profile);