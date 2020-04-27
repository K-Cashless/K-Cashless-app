import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

const UserProfilePic = ({navigation, pic}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Profile');
                }}
                style={{width: 40, height: 40, borderRadius: 40, backgroundColor: 'white'}}
            >
                {
                    pic &&
                    <Image source={{uri: pic}} style={{width: 40, height: 40, borderRadius: 40}}
                           resizeMode='cover'/>
                }
            </TouchableOpacity>
        </View>
    );
};

function mapStateToProps(state) {
    return {
        pic: state.User.pic
    }
}

export default connect(mapStateToProps)(UserProfilePic);