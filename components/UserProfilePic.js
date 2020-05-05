import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

const UserProfilePic = ({navigation, pic}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Profile');
            }}
            style={{
                width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'
            }}
        >
            <View style={{width: 30, height: 30, borderRadius: 30, backgroundColor: 'white'}}>
                {
                    pic &&
                    <Image source={{uri: pic}} style={{width: 30, height: 30, borderRadius: 30}}
                           resizeMode='cover'/>
                }
            </View>
        </TouchableOpacity>
    );
};

function mapStateToProps(state) {
    return {
        pic: state.User.pic
    }
}

export default withNavigation(connect(mapStateToProps)(UserProfilePic));