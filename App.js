import React , {useState} from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Navigator from './navigations/Navigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyC9irtT3viSOvH3gLArcEbkgjrYzPEgEBU",
  authDomain: "k-cashless-6525b.firebaseapp.com",
  databaseURL: "https://k-cashless-6525b.firebaseio.com",
  projectId: "k-cashless-6525b",
  storageBucket: "k-cashless-6525b.appspot.com",
  messagingSenderId: "1066265984682",
  appId: "1:1066265984682:web:993f89a697d3c4270d5ad3",
  measurementId: "G-FHD4GXP61L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();


const AppContainer = createAppContainer(Navigator);
const fetchFonts = () =>{
  return Font.loadAsync({
    'proxima-regular': require('./assets/fonts/proxima/Proxima-Nova-Regular.otf'),
    'proxima-bold': require('./assets/fonts/proxima/Proxima-Nova-Bold.otf'),
    'proxima-extrabold': require('./assets/fonts/proxima/Proxima-Nova-Extrabold.otf'),
    'proxima-black': require('./assets/fonts/proxima/Proxima-Nova-Black.otf'),
      });
};

export default function App() {
  const [dataLoaded,setDataLoaded] = useState(false);
  if(!dataLoaded){
    return(
      <AppLoading
      startAsync = {fetchFonts}
      onFinish = {() => setDataLoaded(true)}
      />
    );
  }
  StatusBar.setBarStyle('light-content',true);
  return (
      <AppContainer />
  );
}