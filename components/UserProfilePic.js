import React, {useState} from 'react';
import { Image, TouchableOpacity} from 'react-native';

const UserProfilePic = () => {
    const [cnt,setCnt] = useState(0);
    return (
        <TouchableOpacity
            onPress = {() => {console.log("PRESS" + cnt);setCnt(cnt+1)}}>
            <Image source = {require('../assets/demoPic.png')} style = {{ width: 40,height: 40, borderRadius: 40 }} resizeMode = 'cover'/>
        </TouchableOpacity>
    );
};

export default UserProfilePic;