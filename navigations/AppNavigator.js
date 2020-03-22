import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainApp from '../scenes/MainApp';
import RedeemPoint from '../scenes/RedeemPoint';
import RedeemPointComplete from '../scenes/RedeemPointComplete';
import TopUp from '../scenes/TopUp';
import TopUpConfirm from '../scenes/TopUpConfirm';
import TopUpComplete from '../scenes/TopUpComplete';

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
        TopUpConfirm: {
            screen: TopUpConfirm
        },
        TopUpComplete: {
            screen: TopUpComplete
        }
    },
    {
        initialRouteName: 'MainApp',
        // initialRouteName: 'TopUp', // for Development Only
        headerMode: 'none',
        gesturesEnabled: false,
    }
);

export default createAppContainer(AppNavigator);