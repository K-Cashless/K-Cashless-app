import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const QuickActionsGrid = ({navigation}) => {
    return (
        <View style={{
            width: '100%',
            height: '70%',
        }}>
            {/*ROW 1*/}
            <View style={style.gridRowContainer}>
                <GridButton text={'Top Up'} iconName={'money-bill-wave'} onPress={() => {
                    navigation.navigate('TopUp');
                }}/>
                <GridButton
                    text={'History'}
                    iconName={'hourglass-half'}
                    onPress={() =>{navigation.navigate('History')}}/>
            </View>
            {/*ROW 2*/}
            <View style={style.gridRowContainer}>
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
        justifyContent: 'center',
    },
    iconContainer: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    descriptionContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    descriptionText: {
        fontFamily: 'proxima-bold',
        justifyContent: 'flex-start',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    gridRowContainer: {
        flex: 1,
        flexDirection: 'row',
    }
});
export default QuickActionsGrid;

