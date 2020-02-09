import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Navigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        App: AppNavigator,
    },
    {
        initialRouteName: 'Auth'
    });

export default createAppContainer(Navigator);