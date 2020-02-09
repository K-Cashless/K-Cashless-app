import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainApp from '../scenes/MainApp';

const AppNavigator = createStackNavigator(
    {
        MainApp:{
            screen: MainApp
        },
    },
    {
        initialRouteName: 'MainApp',
        headerMode: 'none',
        
    }
);

export default createAppContainer(AppNavigator);