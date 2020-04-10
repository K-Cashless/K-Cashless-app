import React, {useState} from 'react';
import {Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import MainStyles from '../styles/MainStyles';
import SubScreenHeader from "../components/SubScreenHeader";
import NormalTextInput from "../components/NormalTextInput";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as color from '../styles/Colors';
import TransparentButton from "../components/TransparentButton";

const SignUpP2 = ({navigation}) => {
    const [imgUri, setImgUri] = useState('');
    const [info, setInfo] = useState(navigation.getParam('info', {}));
    const demoPic = require('../assets/demoPic.png');
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={{marginHorizontal: 20, top: '5%', justifyContent: 'flex-end'}}>
                    <SubScreenHeader title={'Sign Up'} navigation={navigation} backButton={true}/>
                    <KeyboardAwareScrollView>
                        <View style={{marginTop: 20}}>
                            <View style={{marginTop: 20, alignItems: 'center'}}>
                                <Image source={imgUri.length === 0 ? demoPic : {uri: imgUri}}
                                       style={{width: 100, height: 100, borderRadius: 100}}
                                       resizeMode='cover'/>
                                <TextButton text={'Add Your Photo'} color={color.primary}
                                            onPress={() => handleImagePicking(setImgUri)}/>
                            </View>
                            <NormalTextInput
                                placeholder={'First Name'}
                                onChangeText={(text) => setInfo({...info, firstName: text})}
                                value={info.firstName}
                            />
                            <NormalTextInput
                                placeholder={'Last Name'}
                                onChangeText={(text) => setInfo({...info, lastName: text})}
                                value={info.lastName}
                            />
                            <NormalTextInput
                                placeholder={'Phone'}
                                onChangeText={(text) => setInfo({...info, phone: text})}
                                value={info.phone}
                            />
                        </View>
                        <TransparentButton
                            text={'Sign Up'}
                            style={{backgroundColor: 'rgb(38,115,226)'}}
                            onPress={() => {
                                // TODO - firebase
                                console.log('SEND');
                                console.log(info);
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({routeName: 'SignUpComplete'})],
                                });
                                navigation.dispatch(resetAction);
                            }}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const TextButton = ({text, color, onPress}) => {
    return (
        <TouchableOpacity style={{margin: 20}} onPress={onPress}>
            <Text style={[MainStyles.head2Text, {color: color}]}>{text}</Text>
        </TouchableOpacity>
    )
};

const handleImagePicking = async (setImgUri) => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permission.status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (result.cancelled === false) {
            setImgUri(result.uri);
        }
    }
};

export default SignUpP2;