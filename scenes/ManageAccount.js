import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import SubScreenHeader from "../components/SubScreenHeader";
import MInfoSection from '../components/MInfoSection';
import MainStyles from '../styles/MainStyles';
import {connect} from 'react-redux';
import * as color from '../styles/Colors';
import NormalTextInput from "../components/NormalTextInput";
import store from '../store';
import * as actions from '../actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import API_URL from "../firebase/apiLinks";
import axios from 'axios';
import {BallIndicator} from "react-native-indicators";


const ManageAccount = ({navigation, User}) => {
    const [showLoading, setShowLoading] = useState(false);
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <KeyboardAwareScrollView>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <View style={{marginHorizontal: 20, top: 0, justifyContent: 'flex-end'}}>
                        <View style={{marginTop: '10%', width: '100%'}}>
                            <View style={{flexDirection: 'row'}}>
                                <SubScreenHeader navigation={navigation} title={'Manage Account'} backButton={true}/>
                                {
                                    showLoading ? (
                                        <View style={{position: 'absolute', right: 0, alignSelf: 'center'}}>
                                            <BallIndicator size={20} color={'white'}/>
                                        </View>
                                    ) : null
                                }
                            </View>


                            <View style={{marginTop: 20, alignItems: 'center'}}>
                                <View style={{width: 100, height: 100, borderRadius: 100, backgroundColor: 'white'}}>
                                    {
                                        User.pic &&
                                        <Image source={{uri: User.pic}}
                                               style={{width: 100, height: 100, borderRadius: 100}}
                                               resizeMode='cover'/>
                                    }
                                </View>

                                <View style={{margin: 20}}>
                                    <TextButton text={'EDIT'} color={color.primary}
                                                onPress={() => handleImagePicking(User.token, setShowLoading)}/>
                                </View>
                            </View>


                            <UserInfo title={'Student ID'} value={User.id}/>
                            <UserInfo title={'Email'} value={User.email}/>
                            <UserInfo title={'First Name'} value={User.firstName}/>
                            <UserInfo title={'Last Name'} value={User.lastName}/>
                            <UserInfo title={'Phone'} value={User.phone}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </View>
    )
};

const UserInfo = ({title, value, onFinishEditing}) => {
    const [edit, setEdit] = useState(false);

    return (
        <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{flex: 1}}>
                    <MInfoSection title={title} value={value}/>
                </View>
                <View style={{justifyContent: 'center'}}>
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
                        <View style={{justifyContent: 'center'}}>
                            <TextButton text={'DONE'} color={color.primary} onPress={() => setEdit(false)}/>
                        </View>
                    </View>
                ) : null}
        </View>
    )
};

const TextButton = ({text, color, onPress}) => {
    return (
        <TouchableOpacity style={{}} onPress={onPress}>
            <Text style={[MainStyles.head2Text, {fontSize: 16, color: color}]}>{text}</Text>
        </TouchableOpacity>
    )
};

const handleImagePicking = async (token, setShowLoading) => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permission.status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (result.cancelled === false) {
            let infoToSend = new FormData();
            infoToSend.append('image', {
                uri: result.uri,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            });
            console.log("uploading: ", result);
            setShowLoading(true);
            axios.post(API_URL.UPLOAD_IMAGE, infoToSend, {
                'headers': {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => {
                    setShowLoading(false);
                    console.log(res);
                    store.dispatch(actions.User.setPic(result.uri));
                })
                .catch(error => console.log(error));
        }
    }
};

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(ManageAccount);