import { StyleSheet } from 'react-native';
import * as Colors from '../styles/Colors';

const MainStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    head1Text: {
        fontFamily: 'proxima-extrabold',
        fontSize: 35,
        color: Colors.primary,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    head2Text: {
        fontFamily: 'proxima-bold',
        fontSize: 20,
        color: 'white',
        fontWeight: 'normal'
    },
    bodyText: {
        fontFamily: 'proxima-regular',
        fontSize: 18,
        color: 'white',
        fontWeight: 'normal'
    },
    textInput: {
        fontFamily: 'proxima-regular',
        fontSize: 18,
        color: 'white',
        borderColor: 'rgba(0,0,0,0)',
        borderBottomColor: 'white',
        borderWidth: 1,
        width: '100%',
        height: 50,
        paddingLeft: 6,
    },
    textButton:{
        fontFamily: 'proxima-bold',
        textDecorationLine: 'underline',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    mainAppHeaderLabel: {
        fontFamily: 'proxima-extrabold',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'left',
    }
});

export const BlueButton = StyleSheet.create({
    buttonContainer: {
        height: 70,
        width: '100%',
        borderRadius: 3,
        backgroundColor: 'rgb(38,115,226)',
        justifyContent: 'center',
    },
    buttonContainerDisable: {
        flex: 1,
        height: 70,
        width: '100%',
        borderRadius: 3,
        backgroundColor: 'rgba(38,115,226,0.5)',
        justifyContent: 'center',
    },
    buttonAlign: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        bottom: '8%',
    },
    buttonText: {
        fontFamily: 'proxima-bold',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    buttonContainerOutline: {
        height: 70,
        width: '100%',
        borderRadius: 3,
        borderWidth: 3,
        borderColor: 'rgb(38,115,226)',
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
    },
});

export default MainStyles;