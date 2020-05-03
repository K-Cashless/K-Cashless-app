import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Navigator from './navigations/Navigator';
import {AppLoading, Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import {Audio} from 'expo-av';

import {Provider} from 'react-redux';
import store from './store';
import * as action from './actions';

const AppContainer = createAppContainer(Navigator);

const fetchFonts = async () => {
    return Font.loadAsync({
        'proxima-regular': require('./assets/fonts/proxima/Proxima-Nova-Regular.otf'),
        'proxima-bold': require('./assets/fonts/proxima/Proxima-Nova-Bold.otf'),
        'proxima-extrabold': require('./assets/fonts/proxima/Proxima-Nova-Extrabold.otf'),
        'proxima-black': require('./assets/fonts/proxima/Proxima-Nova-Black.otf'),
    });
};

async function registerNotification() {
    let status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status.status !== 'granted') return;

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Permission: ');
    console.log(status.status, token);
}

async function registerAudio() {
    await Audio.requestPermissionsAsync();
}

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        registerNotification().then();
        registerAudio().then();
        Notifications.addListener(async ({origin, data}) => {
            console.log('NOTIFICATIONS: ', origin, data, Date.now());
            const infoToPush = {
                id: Date.now().toString(),
                read: false,
                title: data.title,
                body: data.body
            };
            store.dispatch(action.User.pushNotificationsList(infoToPush));
            store.dispatch(action.User.setNotificationsUnread(true));

            store.dispatch(action.User.setAnimationSignal(true));
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(require('./assets/notification.wav'));
                await soundObject.playAsync();
                // Your sound is playing!
            } catch (error) {
                // An error occurred!
            }
            setTimeout(() => {
                store.dispatch(action.User.setAnimationSignal(false))
            }, 500);
        });
    }, []);

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