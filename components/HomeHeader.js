import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as colors from '../styles/Colors';
import * as Icon from 'react-native-vector-icons';

const HomeHeader = ({name,balance}) => {
    return (
        <View style={styles.header}>
            <View style={{flexDirection: 'row' ,marginTop: 50, marginHorizontal: 20,height:'100%'}}>
                <View style={{
                    alignItems: 'left',
                    width: '50%'
                }}>
                    <Icon.AntDesign name={'user'} size={30} color={'white'}/>
                </View>
                <View style={{
                    alignItems: 'flex-end',
                    width: '30%'
                }}>
                    <Icon.AntDesign name={'bells'} size={30} color={'white'}/>
                </View>
                 <View style={{
                    alignItems: 'flex-end',
                    width: '20%'
                }}>
                    <Text style={{color: 'white'}}>Balance</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        backgroundColor: colors.primary,
        borderRadius:3,
    }
});
export default HomeHeader;