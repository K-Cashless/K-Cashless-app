import React, {useRef, useState} from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
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
import NormalTextInput from "../components/NormalTextInput";
import TransparentButton from "../components/TransparentButton";


const ManageAccount = ({navigation, User}) => {
    const refRBSheet = useRef();
    const [showLoading, setShowLoading] = useState(false);
    const [editedField, setEditedField] = useState(null);
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <KeyboardAwareScrollView>
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
                                  setEditedField={setEditedField} editable={false}/>
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
            </KeyboardAwareScrollView>
            <RBSheet
                ref={refRBSheet}
                animationType={'fade'}
                duration={200}
                height={250}
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
                {/*<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>*/}
                <EditingSheet editedField={editedField} refRBSheet={refRBSheet}/>
                {/*</TouchableWithoutFeedback>*/}
            </RBSheet>
        </View>
    )
};

const EditingSheet = ({editedField, refRBSheet}) => {
    const [field, setField] = useState('');
    const errorState = useState(true);

    const handleEmailUpdate = async () => {
        return new Promise(async (resolve, reject) => {
            let infoToSend = null;
            await axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                .then(res => {
                    // Update User Data
                    store.dispatch(actions.User.setId(res.data[0].userId));
                    store.dispatch(actions.User.setFirstName(res.data[0].firstName));
                    store.dispatch(actions.User.setLastName(res.data[0].lastName));
                    store.dispatch(actions.User.setBalance(res.data[0].deposit));
                    store.dispatch(actions.User.setKpoints(res.data[0].point));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));

                    const tempInfo = res.data[0];
                    infoToSend = {
                        email: field,
                        password: "",
                        confirmPassword: "",
                        handle: tempInfo.handle,
                        firstName: tempInfo.firstName,
                        lastName: tempInfo.lastName,
                        phone: tempInfo.phone,
                    }
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
            await console.log(infoToSend);
            resolve();

            await axios.post(API_URL.UPDATE_USER_DATA, infoToSend, {
                'headers': {
                    'Authorization': 'Bearer ' + store.getState().User.token
                }
            })
                .then(() => {
                    store.dispatch(actions.User.setEmail(field));
                    refRBSheet.current.close();
                    resolve();
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                })
        });
    };

    const handleFirstNameUpdate = async () => {
        return new Promise(async (resolve, reject) => {
            let infoToSend = null;
            await axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                .then(res => {
                    // Update User Data
                    store.dispatch(actions.User.setId(res.data[0].userId));
                    store.dispatch(actions.User.setFirstName(res.data[0].firstName));
                    store.dispatch(actions.User.setLastName(res.data[0].lastName));
                    store.dispatch(actions.User.setBalance(res.data[0].deposit));
                    store.dispatch(actions.User.setKpoints(res.data[0].point));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));

                    const tempInfo = res.data[0];
                    infoToSend = {
                        email: tempInfo.email,
                        password: "",
                        confirmPassword: "",
                        handle: tempInfo.handle,
                        firstName: field,
                        lastName: tempInfo.lastName,
                        phone: tempInfo.phone,
                    }
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
            await console.log(infoToSend);
            resolve();

            await axios.post(API_URL.UPDATE_USER_DATA, infoToSend, {
                'headers': {
                    'Authorization': 'Bearer ' + store.getState().User.token
                }
            })
                .then(() => {
                    store.dispatch(actions.User.setFirstName(field));
                    refRBSheet.current.close();
                    resolve();
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                })
        });
    };
    const handleLastNameUpdate = async () => {
        return new Promise(async (resolve, reject) => {
            let infoToSend = null;
            await axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                .then(res => {
                    // Update User Data
                    store.dispatch(actions.User.setId(res.data[0].userId));
                    store.dispatch(actions.User.setFirstName(res.data[0].firstName));
                    store.dispatch(actions.User.setLastName(res.data[0].lastName));
                    store.dispatch(actions.User.setBalance(res.data[0].deposit));
                    store.dispatch(actions.User.setKpoints(res.data[0].point));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));

                    const tempInfo = res.data[0];
                    infoToSend = {
                        email: tempInfo.email,
                        password: "",
                        confirmPassword: "",
                        handle: tempInfo.handle,
                        firstName: tempInfo.firstName,
                        lastName: field,
                        phone: tempInfo.phone,
                    }
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
            await console.log(infoToSend);
            resolve();

            await axios.post(API_URL.UPDATE_USER_DATA, infoToSend, {
                'headers': {
                    'Authorization': 'Bearer ' + store.getState().User.token
                }
            })
                .then(() => {
                    store.dispatch(actions.User.setLastName(field));
                    refRBSheet.current.close();
                    resolve();
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                })
        });
    };

    const handlePhoneUpdate = async () => {
        return new Promise(async (resolve, reject) => {
            let infoToSend = null;
            await axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + store.getState().User.token}})
                .then(res => {
                    // Update User Data
                    store.dispatch(actions.User.setId(res.data[0].userId));
                    store.dispatch(actions.User.setFirstName(res.data[0].firstName));
                    store.dispatch(actions.User.setLastName(res.data[0].lastName));
                    store.dispatch(actions.User.setBalance(res.data[0].deposit));
                    store.dispatch(actions.User.setKpoints(res.data[0].point));
                    store.dispatch(actions.User.setEmail(res.data[0].email));
                    store.dispatch(actions.User.setPhone(res.data[0].phone));
                    store.dispatch(actions.User.setPic(res.data[0].imageUrl));

                    const tempInfo = res.data[0];
                    infoToSend = {
                        email: tempInfo.email,
                        password: "",
                        confirmPassword: "",
                        handle: tempInfo.handle,
                        firstName: tempInfo.firstName,
                        lastName: tempInfo.lastName,
                        phone: field,
                    }
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                });
            await console.log(infoToSend);
            resolve();

            await axios.post(API_URL.UPDATE_USER_DATA, infoToSend, {
                'headers': {
                    'Authorization': 'Bearer ' + store.getState().User.token
                }
            })
                .then(() => {
                    store.dispatch(actions.User.setPhone(field));
                    refRBSheet.current.close();
                    resolve();
                })
                .catch(error => {
                    console.log(error.response);
                    Alert.alert('Error Trying to Update Your Info', 'Please Try Again');
                    reject();
                })
        });
    };

    switch (editedField) {
        case 'Email':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Email</Text>
                    <NormalTextInput
                        placeholder={'Enter your new email*'}
                        onChangeText={(text) => setField(text)}
                        value={field}
                        errorStatus={errorState}
                        errorRule={[
                            {
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Incorrect Email Format'
                            },
                            {pattern: /^\w+([.-]?\w+)*@kmitl.ac.th/, message: 'KMITL Email Only'},
                        ]}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                            <Text style={[MainStyles.bodyText, {
                                fontFamily: 'proxima-bold',
                                color: 'red',
                                marginTop: 20,
                                right: 25
                            }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TransparentButton
                            text={'Done'}
                            style={{backgroundColor: errorState[0] ? 'rgb(150,150,150)' : 'rgb(38,115,226)'}}
                            onPress={handleEmailUpdate}
                        />
                    </View>
                </View>
            );
        case 'First Name':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter First Name</Text>
                    <NormalTextInput
                        placeholder={'Enter your first name*'}
                        onChangeText={(text) => setField(text)}
                        value={field}
                        errorStatus={errorState}
                        errorRule={[
                            {pattern: /.+/, message: 'First Name Must Not Be Empty'},
                        ]}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                            <Text style={[MainStyles.bodyText, {
                                fontFamily: 'proxima-bold',
                                color: 'red',
                                marginTop: 20,
                                right: 25
                            }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TransparentButton
                            text={'Done'}
                            style={{backgroundColor: errorState[0] ? 'rgba(150,150,150,0.5)' : 'rgb(38,115,226)'}}
                            onPress={handleFirstNameUpdate}
                        />
                    </View>
                </View>
            );
        case 'Last Name':
            return (

                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Last Name</Text>
                    <NormalTextInput
                        placeholder={'Enter your last name*'}
                        onChangeText={(text) => setField(text)}
                        value={field}
                        errorStatus={errorState}
                        errorRule={[
                            {pattern: /.+/, message: 'Last Name Must Not Be Empty'},
                        ]}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                            <Text style={[MainStyles.bodyText, {
                                fontFamily: 'proxima-bold',
                                color: 'red',
                                marginTop: 20,
                                right: 25
                            }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TransparentButton
                            text={'Done'}
                            style={{backgroundColor: errorState[0] ? 'rgb(150,150,150)' : 'rgb(38,115,226)'}}
                            onPress={handleLastNameUpdate}
                        />
                    </View>
                </View>
            );
        case 'Phone':
            return (
                <View style={{marginHorizontal: 20}}>
                    <Text style={[MainStyles.bodyText]}>Please Enter Phone</Text>
                    <NormalTextInput
                        placeholder={'Enter your new phone number*'}
                        onChangeText={(text) => setField(text)}
                        value={field}
                        errorStatus={errorState}
                        errorRule={[
                            {pattern: /.+/, message: 'Phone Number Must Not Be Empty'},
                            {pattern: /^\d+$/, message: 'Phone Number Must Contains Numbers Only'},
                        ]}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                            <Text style={[MainStyles.bodyText, {
                                fontFamily: 'proxima-bold',
                                color: 'red',
                                marginTop: 20,
                                right: 25
                            }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TransparentButton
                            text={'Done'}
                            style={{backgroundColor: errorState[0] ? 'rgb(150,150,150)' : 'rgb(38,115,226)'}}
                            onPress={handlePhoneUpdate}
                        />
                    </View>
                </View>
            );
        default:
            return null;
    }
};

const UserInfo = ({title, value, setEditedField, refRBSheet, editable = true}) => {
    return (
        <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{flex: 1}}>
                    <MInfoSection title={title} value={value}/>
                </View>
                <View style={{justifyContent: 'center'}}>
                    {
                        editable ?
                            <TextButton
                                text='Edit'
                                color={color.primary}
                                onPress={() => {
                                    setEditedField(title);
                                    refRBSheet.current.open();
                                }}/> : null
                    }

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