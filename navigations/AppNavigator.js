import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainApp from '../scenes/MainApp';
import RedeemPoint from '../scenes/RedeemPoint';
import RedeemPointComplete from '../scenes/RedeemPointComplete';
import TopUp from '../scenes/TopUp';
import TopUpComplete from '../scenes/TopUpComplete';
import NotificationView from '../scenes/NotificationView';

const AppNavigator = createStackNavigator(
    {
        MainApp: {
            screen: MainApp
        },
        RedeemPoint: {
            screen: RedeemPoint
        },
        RedeemPointComplete: {
            screen: RedeemPointComplete
        },
        TopUp: {
            screen: TopUp
        },
        TopUpComplete: {
            screen: TopUpComplete
        },
        NotificationView: {
            screen: NotificationView
        },
    },
    {
        initialRouteName: 'MainApp',
        // initialRouteName: 'NotificationView', // for Development Only
        headerMode: 'none',
        gesturesEnabled: false,
    }
);

export default createAppContainer(AppNavigator);