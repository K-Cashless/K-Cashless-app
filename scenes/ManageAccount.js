import React, {useRef, useState} from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import {Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import SubScreenHeader from "../components/SubScreenHeader";
import MInfoSection from '../components/MInfoSection';
import MainStyles from '../styles/MainStyles';
import {connect} from 'react-redux';
import * as color from '../styles/Colors';
import store from '../store';
import * as actions from '../actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import API_URL from "../firebase/apiLinks";
import axios from 'axios';
import {BallIndicator} from "react-native-indicators";


const ManageAccount = ({navigation, User}) => {
    const refRBSheet = useRef();
    const [showLoading, setShowLoading] = useState(false);
    const [editedField, setEditedField] = useState(null);
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
                                    <TextButton text={'Edit'} color={color.primary}
                                                onPress={() => handleImagePicking(User.token, setShowLoading)}/>
                                </View>
                            </View>


                            <UserInfo title={'Student ID'} value={User.id} refRBSheet={refRBSheet}
                                      setEditedField={setEditedField}/>
                            <UserInfo title={'Email'} value={User.email} refRBSheet={refRBSheet}
                                      setEditedField={setEditedField}/>
                            <UserInfo title={'First Name'} value={User.firstName} refRBSheet={refRBSheet}
                                      setEditedField={setEditedField}/>
                            <UserInfo title={'Last Name'} value={User.lastName} refRBSheet={refRBSheet}
                                      setEditedField={setEditedField}/>
                            <UserInfo title={'Phone'} value={User.phone} refRBSheet={refRBSheet}
                                      setEditedField={setEditedField}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
            <RBSheet
                ref={refRBSheet}
                animationType={'fade'}
                duration={200}
                height={320}
                closeOnDragDown={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    },
                    container: {
                        backgroundColor: color.background,
                    },
                    draggableIcon: {
                        backgroundColor: 'white'
                    }
                }}
            >
                <EditingSheet editedField={editedField}/>
            </RBSheet>
        </View>
    )
};

const EditingSheet = ({editedField}) => {
    switch (editedField) {
        case 'Student ID':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Student ID</Text>
                </View>
            );
        case 'Email':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Email</Text>
                </View>
            );
        case 'First Name':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter First Name</Text>
                </View>
            );
        case 'Last Name':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Last Name</Text>
                </View>
            );
        case 'Phone':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Phone</Text>
                </View>
            );
        default:
            return null;
    }
};

const UserInfo = ({title, value, setEditedField, refRBSheet}) => {
    return (
        <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{flex: 1}}>
                    <MInfoSection title={title} value={value}/>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TextButton
                        text='Edit'
                        color={color.primary}
                        onPress={() => {
                            setEditedField(title);
                            refRBSheet.current.open();
                        }}/>
                </View>
            </View>
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