import React, {useState} from 'react';
import {Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomeHeader, KPointRect, PromotionHeader, QuickActionsGrid, ScanButton} from '../components';
import LibraryHeader from '../components/LibraryHeader';
import MInfoSection from '../components/MInfoSection';
import QRCode from 'react-native-qrcode-svg';
import * as colors from '../styles/Colors';
import store from '../store';
import RedDot from '../components/RedDot';
import PromotionsList from '../components/PromotionsList';

const HomeScreen = ({navigation}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            {/*Header*/}
            <View style={{
                marginHorizontal: 20,
                top: '5%'
            }}>
                <HomeHeader navigation={navigation}/>
            </View>

            {/*K Point Balance*/}
            <View style={{marginHorizontal: 20, marginTop: '13%'}}>
                <KPointRect navigation={navigation} redeemButton={true}/>
            </View>

            {/*Quick Actions*/}
            <View style={{marginHorizontal: 20, top: '5%'}}>
                <QuickActionsGrid navigation={navigation}/>
            </View>
        </View>
    );
};

const PromotionsScreen = () => {
    const [layout, setLayout] = useState({});
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{top: '5%'}}>
                <View style={{marginHorizontal: 20}}>
                    <PromotionHeader setLayout={setLayout}/>
                </View>
                <View style={{marginTop: 10}}>
                    <PromotionsList topBarLayout={layout}/>
                </View>
            </View>
        </View>
    );
};

const LibraryScreen = () => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{
                marginHorizontal: 20,
                top: '5%',
            }}>
                <LibraryHeader/>
            </View>
            <View style={{
                position: 'absolute',
                marginHorizontal: 20,
                height: '100%',
                alignSelf: 'center',
                justifyContent: 'center'
            }}>
                <MInfoSection title={'STUDENT ID'} value={store.getState().User.id}/>
                <View style={{
                    alignSelf: 'center',
                    marginTop: 30,
                    height: 300,
                    width: 300,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <QRCode value={store.getState().User.id} size={250}/>
                </View>
            </View>
        </View>
    );
};
const MoreScreen = () => {
    return (
        <View style={MainStyles.container}>
            <Text style={MainStyles.head1Text}>More</Text>
        </View>
    );
};


const MainApp = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: () => ({
                tabBarIcon: ({focused, tintColor}) => {
                    return (
                        <View>
                            <Icon name='home' size={25} color={tintColor}/>
                            <RedDot/>
                        </View>
                    );
                },
            })
        },
        Promotions: {
            screen: PromotionsScreen,
            navigationOptions: () => ({
                tabBarIcon: ({focused, tintColor}) => <Icon name='tags' size={25} color={tintColor}/>,
            })
        },
        Scan: {
            screen: () => null,
            navigationOptions: () => ({
                tabBarIcon: <ScanButton/>,
                tabBarLabel: () => null
            })
        },
        Library: {
            screen: LibraryScreen,
            navigationOptions: () => ({
                tabBarIcon: ({focused, tintColor}) => <Icon name='book-reader' size={25} color={tintColor}/>,
            })
        },
        More: {
            screen: MoreScreen,
            navigationOptions: () => ({
                tabBarIcon: ({focused, tintColor}) => <Icon name='dot-circle' size={25} color={tintColor}/>
            })
        },
    },
    {
        tabBarOptions: {
            activeTintColor: colors.primary,
            inactiveTintColor: 'rgba(255,255,255,0.5)',
            showLabel: false,
            labelStyle: {
                fontFamily: 'proxima-regular',
                fontSize: 12
            },
            style: {
                position: 'absolute',
                width: '100%',
                height: 60,
                alignItems: 'center',
                backgroundColor: 'rgb(20,20,20)',
                borderTopColor: "transparent",
            }
        },
    }
);

export default createAppContainer(MainApp);