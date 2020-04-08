import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainApp from '../scenes/MainApp';
import RedeemPoint from '../scenes/RedeemPoint';
import RedeemPointComplete from '../scenes/RedeemPointComplete';
import TopUp from '../scenes/TopUp';
import TopUpComplete from '../scenes/TopUpComplete';
import NotificationView from '../scenes/NotificationView';
import History from '../scenes/History';
import QRScanner from '../scenes/QRScanner';
import PaymentInfo from "../scenes/PaymentInfo";
import PaymentComplete from '../scenes/PaymentComplete';
import Profile from '../scenes/Profile';
import ManageAccount from '../scenes/ManageAccount';

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
        History: {
            screen: History
        },
        QRScanner: {
            screen: QRScanner
        },
        PaymentInfo: {
            screen: PaymentInfo
        },
        PaymentComplete: {
            screen: PaymentComplete
        },
        Profile: {
            screen: Profile
        },
        ManageAccount: {
            screen: ManageAccount
        }
    },
    {
        initialRouteName: 'MainApp',
        // initialRouteName: 'Profile', // for Development Only
        headerMode: 'none',
        gesturesEnabled: false,
    }
);

export default createAppContainer(AppNavigator);