import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import GetStart from '../scenes/GetStart';
import SignIn from '../scenes/SignIn';
import ForgetPassword from '../scenes/ForgetPassword';

const AuthNavigator = createStackNavigator(
    {
        GetStart: {
            screen: GetStart
        },
        SignIn: {
            screen: SignIn
        },
        ForgetPassword: {
            screen: ForgetPassword
        },
    },
    {
        initialRouteName: 'GetStart',
        headerMode: 'none',
    }
);

export default createAppContainer(AuthNavigator);