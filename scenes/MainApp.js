import React, {useState} from 'react';
import {Dimensions, RefreshControl, ScrollView, Text, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomeHeader, KPointRect, PromotionHeader, QuickActionsGrid, ScanButton} from '../components';
import LibraryHeader from '../components/LibraryHeader';
import MInfoSection from '../components/MInfoSection';
import QRCode from 'react-native-qrcode-svg';
import * as colors from '../styles/Colors';
import * as actions from '../actions';
import RedDot from '../components/RedDot';
import PromotionsList from '../components/PromotionsList';
import RecentActivity from '../components/RecentActivity';
import axios from 'axios';
import API_URL from '../firebase/apiLinks';
import store from '../store';

const HomeScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        const token = store.getState().User.token;
        axios.get(API_URL.GET_USER_DATA, {'headers': {'Authorization': 'Bearer ' + token}})
            .then(res => {
                const infoToSet = {
                    id: res.data[0].userId,
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    balance: res.data[0].deposit,
                    kpoints: res.data[0].point,
                    email: res.data[0].email,
                    phone: res.data[0].phone,
                    pic: res.data[0].imageUrl,
                };
                store.dispatch(actions.User.updateUserData(infoToSet));
            })
            .catch(err => console.log(err))
            .finally(() => setRefreshing(false));

    };
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            {/*Header*/}
            <View style={{top: '5%'}}>
                <View style={{marginHorizontal: 20}}>
                    <HomeHeader navigation={navigation}/>
                </View>
                <ScrollView
                    style={{marginTop: 20}}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor='white'
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {/*K Point Balance*/}
                    <View style={{marginTop: 20, marginHorizontal: 20}}>
                        <KPointRect style={{shadowRadius: 10, shadowOpacity: 0.9}} navigation={navigation}
                                    redeemButton={true}/>
                    </View>
                    <View style={{marginTop: 40, marginHorizontal: 20, height: 100}}>
                        <RecentActivity/>
                    </View>
                    {/*Quick Actions*/}
                    <View style={{
                        flex: 1,
                        marginHorizontal: 20,
                        justifyContent: 'center',
                        height: Dimensions.get('window').height / 4
                    }}>
                        <QuickActionsGrid navigation={navigation}/>
                    </View>
                    <View style={{height: Dimensions.get('window').height / 3}}/>
                </ScrollView>
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
                    height: Dimensions.get('screen').width - 50,
                    width: Dimensions.get('screen').width - 50,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <QRCode value={store.getState().User.id} size={Dimensions.get('screen').width - 100}/>
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