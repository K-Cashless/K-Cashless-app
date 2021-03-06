import React, {useState} from 'react';
import {Alert, Dimensions, RefreshControl, ScrollView, View} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomeHeader, KPointRect, PromotionHeader, QuickActionsGrid, ScanButton} from '../components';
import LibraryHeader from '../components/LibraryHeader';
import MInfoSection from '../components/MInfoSection';
import QRCode from 'react-native-qrcode-svg';
import * as colors from '../styles/Colors';
import RedDot from '../components/RedDot';
import PromotionsList from '../components/PromotionsList';
import RecentActivity from '../components/RecentActivity';
import store from '../store';
import {getAllUserData} from "../firebase/functions";
import UserProfilePic from "../components/UserProfilePic";

const HomeScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        getAllUserData()
            .catch(err => {
                console.log(err);
                Alert.alert('Error Trying To Update Data');
            })
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
                    <View style={{marginTop: 40, marginHorizontal: 20, height: 160}}>
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
// const MoreScreen = () => {
//     return (
//         <View style={MainStyles.container}>
//             <Text style={MainStyles.head1Text}>More</Text>
//         </View>
//     );
// };


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
                tabBarOnPress: ({navigation}) => {
                    navigation.navigate('QRScanner');
                },
                tabBarLabel: () => null,
            })
        },
        Library: {
            screen: LibraryScreen,
            navigationOptions: () => ({
                tabBarIcon: ({focused, tintColor}) => {
                    return (
                        <Icon name='book-reader' size={25} color={tintColor}/>
                    )
                },
            })
        },
        More: {
            screen: () => null,
            navigationOptions: () => ({
                tabBarIcon: <UserProfilePic/>,
                tabBarOnPress: ({navigation}) => {
                    navigation.navigate('Profile');
                },
                tabBarLabel: () => null,
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