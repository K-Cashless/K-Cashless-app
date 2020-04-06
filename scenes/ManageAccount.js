import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import SubScreenHeader from "../components/SubScreenHeader";
import MInfoSection from '../components/MInfoSection';
import MainStyles from '../styles/MainStyles';
import {connect} from 'react-redux';
import * as color from '../styles/Colors';
import NormalTextInput from "../components/NormalTextInput";

const ManageAccount = ({navigation, User}) => {
    const [testImg, setTestImg] = useState('../assets/demoPic.png');
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center'}}>
                <View style={{top: '5%', width: '100%'}}>
                    <SubScreenHeader navigation={navigation} title={'Manage Account'} backButton={true}/>
                    <View style={{marginTop: 20, alignItems: 'center'}}>
                        <Image source={{uri: testImg}}
                               style={{width: 100, height: 100, borderRadius: 100}}
                               resizeMode='cover'/>
                        <TextButton text={'EDIT'} color={color.primary} onPress={() => handleImagePicking(setTestImg)}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <MInfoSection title={'STUDENT ID'} value={User.id + ''}/>
                    </View>
                    <UserInfo title={'NAME'} value={User.name + ''}/>
                    <UserInfo title={'PHONE'} value={User.phone + ''}/>
                </View>
            </View>
        </View>
    )
};

const UserInfo = ({title, value, onFinishEditing}) => {
    const [edit, setEdit] = useState(false);

    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={{flex: 2}}>
                    <MInfoSection title={title} value={value}/>
                </View>
                <View style={{flexWrap: 'wrap'}}>
                    <TextButton
                        text={edit ? 'CANCEL' : 'EDIT'}
                        color={edit ? 'red' : color.primary}
                        onPress={() => {
                            setEdit(!edit);
                        }}/>
                </View>
            </View>
            {
                edit ? (
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <NormalTextInput/>
                        </View>
                        <TextButton text={'DONE'} color={color.primary} onPress={() => setEdit(false)}/>
                    </View>
                ) : null}
        </View>
    )
};

const TextButton = ({text, color, onPress}) => {
    return (
        <TouchableOpacity style={{margin: 20}} onPress={onPress}>
            <Text style={[MainStyles.head2Text, {color: color}]}>{text}</Text>
        </TouchableOpacity>
    )
};

const handleImagePicking = async (setTestImg) => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permission.status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (result.cancelled === false) {
            setTestImg(result.uri);
        }
    }
};

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(ManageAccount);