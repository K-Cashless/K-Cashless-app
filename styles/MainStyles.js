import { StyleSheet } from 'react-native';
import * as colors from '../styles/Colors';

const MainStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    head1Text:{
        fontSize: 30,
        color: colors.primary,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bodyText:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'normal'
    },
    textInput:{
        fontSize: 20,
        color: 'white',
        borderColor: 'rgba(0,0,0,0)',
        borderBottomColor: 'white',
        borderWidth: 1,
        width: '100%',
        height: 50,
        paddingLeft: 6,
    },
});

export default MainStyles;