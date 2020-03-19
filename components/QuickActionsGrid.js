import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Icon from 'react-native-vector-icons';

const QuickActionsGrid = ({navigation}) => {
    return (
        <View style={{
            width: '100%',
            height: '70%',
        }}>
            {/*ROW 1*/}
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <GridButton text={'Add Money'} iconName={'money-bill-wave'}/>
                <GridButton text={'History'} iconName={'hourglass-half'}/>
            </View>
            {/*ROW 2*/}
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <GridButton text={'Library'} iconName={'book-reader'}/>
            </View>
        </View>
    );
};

const GridButton = ({iconName, text, onPress}) => {
    return (
        <TouchableOpacity style={style.gridButton}>
            <View style={style.iconContainer}>
                <Icon.FontAwesome5 name={iconName} color={'white'} size={60}/>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    descriptionText: {
        fontFamily: 'proxima-bold',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    }
});
export default QuickActionsGrid;

