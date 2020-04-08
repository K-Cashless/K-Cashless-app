import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import * as colors from '../styles/Colors';
import {connect} from 'react-redux'
import SubScreenHeader from "../components/SubScreenHeader";
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
                    <Image source={{uri: User.pic}} style={{width: 60, height: 60, borderRadius: 80}}
                           resizeMode='cover'/>
                </View>

                <View style={{flex: 3, marginLeft: 20, height: 110, justifyContent: 'flex-start'}}>
                    {/*Sample Data*/}
                    <Text style={{
                        fontFamily: 'proxima-bold',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                    }}>{User.name}</Text>
                    <Text style={{
                        fontFamily: 'proxima-regular',
                        fontSize: 18,
                        color: 'white',
                    }}>090-0000000</Text>
                    <View style={{flex: 1, marginTop: 10}}>
                        <Text style={{
                            fontFamily: 'proxima-bold',
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'right'
                        }}>{User.balance.toFixed(2)} {'\u0E3F'}</Text>
                    </View>
                    <Text style={{
                        fontFamily: 'proxima-regular',
                        fontSize: 18,
                        fontWeight: 'bold',
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
            onPress={() => {
                console.log('press!');
                firebase.auth().signOut().then(() => navigation.navigate('SignIn'));
            }}
        >
            <Text style={[MainStyles.head2Text, {fontSize: 20, textAlign: 'center', color: 'red'}]}>
                Sign Out
            </Text>
        </TouchableOpacity>
    )
};

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(Profile);