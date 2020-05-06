import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const QuickActionsGrid = ({navigation}) => {
    return (
        <View style={{
            width: '100%',
            height: 300,
        }}>
            {/*ROW 1*/}
            <View style={style.gridRowContainer}>
                <GridButton text={'Top Up'} iconName={'money-bill-wave'} onPress={() => {
                    navigation.navigate('TopUpP1');
                }}/>
                <GridButton
                    text={'History'}
                    iconName={'hourglass-half'}
                    onPress={() => {
                        navigation.navigate('History')
                    }}/>
                <GridButton text={'Library'} iconName={'book-reader'} onPress={() => {
                    navigation.navigate('Library')
                }}/>
            </View>
        </View>
    );
};

const GridButton = ({iconName, text, onPress}) => {
    return (
        <TouchableOpacity style={style.gridButton} onPress={onPress}>
            <View style={style.iconContainer}>
                <Icon name={iconName} color={'white'} size={60}/>
            </View>
            <View style={style.descriptionContainer}>
                <Text style={style.descriptionText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    gridButton: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 30
    },
    iconContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    descriptionContainer: {
        justifyContent: 'flex-start',
    },
    descriptionText: {
        fontFamily: 'proxima-bold',
        paddingTop: 20,
        justifyContent: 'flex-start',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    gridRowContainer: {
        flexDirection: 'row',
    }
});
export default QuickActionsGrid;

