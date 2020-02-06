import { React } from 'react';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import GetStart  from '../scenes/GetStart';
import SignIn from '../scenes/SignIn';

const AuthNavigator = createSwitchNavigator(
    {
        GetStart: GetStart,
        SignIn: SignIn,
    },
    {
        initialRouteName: 'GetStart',
        headerMode: 'none'
    }
);


export default createAppContainer(AuthNavigator);