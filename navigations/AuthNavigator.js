import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import GetStart from '../scenes/GetStart';
import SignIn from '../scenes/SignIn';
import ForgetPassword from '../scenes/ForgetPassword';
import ForgetPasswordComplete from '../scenes/ForgetPasswordComplete';
import SignUpP1 from '../scenes/SignUpP1';
import SignUpP2 from '../scenes/SignUpP2';

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
        ForgetPasswordComplete: {
            screen: ForgetPasswordComplete
        },
        SignUpP1: {
            screen: SignUpP1,
        },
        SignUpP2: {
            screen: SignUpP2,
        }
    },
    {
        initialRouteName: 'GetStart',
        headerMode: 'none',
    }
);

export default createAppContainer(AuthNavigator);