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
}
const styles = StyleSheet.create({
    buttonContainer:{
        height: 70,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#2AC062',
        justifyContent: 'center',
    },
    buttonAlign:{
        position: 'absolute',
        bottom: '10%',
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
  });

  export default GetStartButton;