import React, { createElement } from 'react';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigator from './AuthNavigator';

const Navigator = createSwitchNavigator({
        Auth: AuthNavigator,
},
{
    initialRouteName: 'Auth'
});

export default createAppContainer(Navigator);