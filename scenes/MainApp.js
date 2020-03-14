import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import MainStyles from '../styles/MainStyles';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PromotionHeader, HomeHeader, KPointRect, ScanButton} from '../components';
import * as colors from '../styles/Colors';

const HomeScreen = ({navigation}) => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            {/*Header*/}
            <View style={{
                marginHorizontal: 20,
                top: '5%'
            }}>
                <HomeHeader name={'Mickey Mouse'} balance={125.25} navigation={navigation}/>
            </View>
            {/*K Point Balance*/}
            <View style={{marginHorizontal: 20, marginTop: '13%'}}>
                <KPointRect point={100}/>
            </View>

            {/*Quick Actions*/}
            <View style={{marginHorizontal: 20, top: '5%'}}>
                <View style={{
                    width: '100%',
                    height: '70%',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            backgroundColor: 'red',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                flex: 3,
                                justifyContent:'center',
                                backgroundColor: 'grey',
                            }}>
                                <Text style={{
                                    fontFamily: 'proxima-bold',
                                    fontSize: 18,
                                    color: 'white',
                                    alignSelf: 'center',
                                }}>ICON</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent:'center',
                                backgroundColor: 'green',
                            }}>
                                <Text style={{
                                    fontFamily: 'proxima-bold',
                                    fontSize: 18,
                                    color: 'white',
                                    alignSelf: 'center',
                                }}>Add Money</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex: 1,
                            backgroundColor: 'red',
                        }}>

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            backgroundColor: 'red',
                        }}>

                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex: 1,
                            backgroundColor: 'red',
                        }}>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
const PromotionsScreen = () => {
    return (
        <View style={[MainStyles.container, {justifyContent: 'flex-start'}]}>
            <View style={{
                marginHorizontal: 20,
                top: '5%'
            }}>
                <PromotionHeader/>
            </View>
        </View>
    );
};

const LibraryScreen = () => {
    return (
        <View style={MainStyles.container}>
            <Text style={MainStyles.head1Text}>Library</Text>
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
                tabBarIcon: ({focused, tintColor}) => (<Icon name='home' size={25} color={tintColor}/>),
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
                tabBarIcon: ({focused}) => <ScanButton/>,
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
            activeTintColor: 'white',
            inactiveTintColor: 'rgba(255,255,255,0.5)',
            showLabel: true,
            labelStyle: {
                fontFamily: 'proxima-regular',
                fontSize: 12
            },
            style: {
                position: 'absolute',
                width: '100%',
                height: 60,
                alignItems: 'center',
                backgroundColor: colors.primary,
            }
        },
    }
);

export default createAppContainer(MainApp);