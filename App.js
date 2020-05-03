import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Navigator from './navigations/Navigator';
import {AppLoading, Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import {BlurView} from 'expo-blur';
import * as Animatable from 'react-native-animatable';

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
    const [showNotification, setShowNotification] = useState(false);
    const [notificationData, setNotificationData] = useState({});
    const [timer, setTimer] = useState(setTimeout(() => {
    }, 0));

    const InAppNotification = ({title = null, body = null}) => {
        return (
            <Animatable.View animation={showNotification ? 'slideInDown' : 'slideOutUp'} duration={500}
                             onAnimationEnd={() => {
                                 if (showNotification) {
                                     setTimer(
                                         setTimeout(() => {
                                             setShowNotification(false);
                                         }, 5000)
                                     );
                                 }
                             }}
                             style={{position: 'absolute', width: '100%', shadowRadius: 10, shadowOpacity: 0.5}}>
                <SafeAreaView>
                    <TouchableOpacity onPress={() => {
                        setShowNotification(false);
                    }}>
                        <BlurView tint={'dark'} intensity={95}
                                  style={{marginHorizontal: 10, flexWrap: 'wrap', borderRadius: 10}}>
                            <View style={{padding: 20, justifyContent: 'center', height: '100%'}}>
                                {
                                    title &&
                                    <Text style={{
                                        fontFamily: 'proxima-bold',
                                        fontSize: 18,
                                        color: 'white',
                                    }}>{title}</Text>
                                }
                                {
                                    body &&
                                    <Text style={{
                                        fontFamily: 'proxima-regular',
                                        fontSize: 18,
                                        color: 'white'
                                    }}>{body}</Text>
                                }
                            </View>
                        </BlurView>
                    </TouchableOpacity>
                </SafeAreaView>
            </Animatable.View>
        )
    };

    const showInAppNotification = async () => {
        clearTimeout(timer);
        setShowNotification(true);
    };

    useEffect(() => {
        registerNotification().then();
        Notifications.addListener(({origin, data}) => {
            console.log('NOTIFICATIONS: ', origin, data);
            setNotificationData(data);
            store.dispatch(action.User.pushNotificationsList(data));
            store.dispatch(action.User.setNotificationsUnread(true));
            showInAppNotification().then();
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
            <InAppNotification title={notificationData.title} body={notificationData.body}/>
        </Provider>
    );
}