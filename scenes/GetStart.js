import React from 'react';
import { View, Text ,Button, TouchableOpacity , StyleSheet} from 'react-native';
import MainStyles from '../styles/MainStyles';
import GetStartButton from '../components/GetStartButton';

export default function GetStarted({ navigation }){
    return(
        <View style = {MainStyles.container}>
            <Text style = {MainStyles.head1Text}>KMITL CASHLESS</Text>
            <Text style = {MainStyles.bodyText}>Cashless Society for Everyone!</Text>
            <GetStartButton navigation={navigation}/>
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