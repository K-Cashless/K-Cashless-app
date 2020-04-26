import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Navigator from './navigations/Navigator';
import {AppLoading, Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';

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

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        registerNotification().then();
        Notifications.addListener(({origin, data}) => {
            console.log('NOTIFICATIONS: ', origin, data);
            store.dispatch(action.User.pushNotificationsList(data));
            store.dispatch(action.User.setNotificationsUnread(true));
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