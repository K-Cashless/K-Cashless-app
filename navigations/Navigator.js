import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Navigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        App: AppNavigator,
    },
    {
        initialRouteName: 'Auth',
        // initialRouteName: 'App', // for Development Only
        headerMode: 'none',
    });

export default createAppContainer(Navigator);