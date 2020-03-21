import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MainStyles from "../styles/MainStyles";
import * as Icon from 'react-native-vector-icons';

const SubScreenHeader = ({navigation, title, backButton}) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyItems: 'center',
        }}>
            {backButton ? (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Icon.FontAwesome5 name={'arrow-circle-left'} size={20} color={'white'}/>
                </TouchableOpacity>
            ) : null}

            <Text style={[MainStyles.mainAppHeaderLabel, {left: (backButton ? 20 : 0)}]}>
                {title}
            </Text>
        </View>
    );
};

export default SubScreenHeader;