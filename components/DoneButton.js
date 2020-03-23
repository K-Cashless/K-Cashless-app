import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const DoneButton = ({navigation}) => {
    const styles = StyleSheet.create({
        buttonContainer: {
            height: 70,
            width: '100%',
            borderRadius: 3,
            backgroundColor: 'rgb(38,115,226)',
            justifyContent: 'center',
            bottom: 0
        },
        buttonAlign: {
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            bottom: 0,
        },
        buttonText: {
            fontFamily: 'proxima-bold',
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            textAlignVertical: 'center',
        },
    });
    return (
        <View style={styles.buttonAlign}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    navigation.navigate('MainApp');
                }}>
                <Text style={styles.buttonText}>
                    Done
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default DoneButton;