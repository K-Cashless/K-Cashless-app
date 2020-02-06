import { StyleSheet } from 'react-native';
const MainStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(40,40,40)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head1Text:{
        fontSize: 30,
        color: 'rgb(246,136,12)',
        fontWeight: 'bold'
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
})

export default MainStyles;