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
    mainAppHeaderLabel:{
        fontFamily: 'proxima-extrabold',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign:'left',
    }
});

export default MainStyles;