import React, { createElement } from 'react';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainApp from '../scenes/MainApp';

const Navigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        App: MainApp,
    },
    {
        initialRouteName: 'Auth'
    });

export default createAppContainer(Navigator);