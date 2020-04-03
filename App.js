import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Navigator from './navigations/Navigator';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import firebaseConfig from './firebase/firebaseConfig';

import {Provider} from 'react-redux';
import store from './store';

const AppContainer = createAppContainer(Navigator);

const fetchFonts = async () => {
    return Font.loadAsync({
        'proxima-regular': require('./assets/fonts/proxima/Proxima-Nova-Regular.otf'),
        'proxima-bold': require('./assets/fonts/proxima/Proxima-Nova-Bold.otf'),
        'proxima-extrabold': require('./assets/fonts/proxima/Proxima-Nova-Extrabold.otf'),
        'proxima-black': require('./assets/fonts/proxima/Proxima-Nova-Black.otf'),
    });
};

firebase.initializeApp(firebaseConfig);

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);
    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
            />
        );
    }
    StatusBar.setBarStyle('light-content', true);
    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
}