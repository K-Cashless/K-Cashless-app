import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import SubScreenHeader from "../components/SubScreenHeader";
import MInfoSection from '../components/MInfoSection';
import MainStyles from '../styles/MainStyles';
import {connect} from 'react-redux';
import * as color from '../styles/Colors';
import NormalTextInput from "../components/NormalTextInput";
import store from '../store';
import * as actions from '../actions';

const ManageAccount = ({navigation, User}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <KeyboardAvoidingView
                behavior={Platform.Os === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <View style={{marginHorizontal: 20, top: 0, justifyContent: 'flex-end'}}>
                        <View style={{marginTop: '10%', width: '100%'}}>
                            <SubScreenHeader navigation={navigation} title={'Manage Account'} backButton={true}/>

                            <View style={{marginTop: 20, alignItems: 'center'}}>
                                <Image source={{uri: User.pic}}
                                       style={{width: 100, height: 100, borderRadius: 100}}
                                       resizeMode='cover'/>
                                <TextButton text={'EDIT'} color={color.primary} onPress={() => handleImagePicking()}/>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <MInfoSection title={'STUDENT ID'} value={User.id + ''}/>
                            </View>
                            <UserInfo title={'NAME'} value={User.name + ''}/>
                            <UserInfo title={'PHONE'} value={User.phone + ''}/>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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

const handleImagePicking = async () => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permission.status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (result.cancelled === false) {
            // TODO - update data with database
            store.dispatch(actions.User.setPic(result.uri));
        }
    }
};

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(ManageAccount);