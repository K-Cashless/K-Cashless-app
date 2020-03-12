import React from 'react';
import { View, Text , TouchableOpacity , StyleSheet} from 'react-native';

const GetStartButton = ({navigation}) =>{
    return(
        <View style = {styles.buttonAlign}>
                <TouchableOpacity
                style = {styles.buttonContainer}
                onPress = {() => navigation.replace('SignIn')}>
                    <Text style={styles.buttonText}>Get Start</Text>
                </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    buttonContainer:{
        flex: 1,
        height: 70,
        width: '100%',
        borderRadius: 3,
        backgroundColor: '#2AC062',
        justifyContent: 'center',
    },
    buttonAlign:{
        position:'absolute',
        width: '100%',
        justifyContent: 'center',
        bottom: '3%',
    },
    buttonText:{
        fontFamily: 'proxima-bold',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
  });

  export default GetStartButton;