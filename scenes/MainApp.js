import React from 'react';
import { Text, View } from 'react-native';
import MainStyles from '../styles/MainStyles';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import * as Icon from 'react-native-vector-icons';

const HomeScreen = () => {
  return (
    <View style={MainStyles.container}>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={MainStyles.head1Text}>HOME</Text>
      </View>
    </View>
  );
}
const PromotionsScreen = () => {
  return (
    <View style={MainStyles.container}>
      <Text style={MainStyles.head1Text}>Promotion</Text>
    </View>
  );
}
const ScanScreen = () => {
  return (
    <View style={MainStyles.container}>
      <Text style={MainStyles.head1Text}>Scan</Text>
    </View>
  );
}
const LibraryScreen = () => {
  return (
    <View style={MainStyles.container}>
      <Text style={MainStyles.head1Text}>Library</Text>
    </View>
  );
}


const MainApp = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Promotions: PromotionsScreen,
    Scan: ScanScreen,
    Library: LibraryScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let IconSet = Icon.MaterialCommunityIcons;
        var iconSize = 35;
        if (routeName === 'Home') {
          IconSet = Icon.MaterialCommunityIcons;
          iconName = focused
            ? 'home-variant'
            : 'home-variant-outline';
        } else if (routeName === 'Promotions') {
          IconSet = Icon.AntDesign;
          iconName = focused ? 'tags' : 'tagso';
        }
        else if (routeName === 'Scan') {
          IconSet = Icon.Ionicons;
          iconName = focused ? 'md-qr-scanner' : 'ios-qr-scanner';
        }

        // You can return any component that you like here!
        return <IconSet name={iconName} size={iconSize} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'rgb(246,136,12)',
      inactiveTintColor: 'white',
      showLabel: true,
      labelStyle: {
        fontSize: 12
      },
      style: {
        position: 'absolute',
        width: '100%',
        height: 60,
        alignItems: 'center',
        backgroundColor: 'rgb(80,80,80)',
      }
    },
  }
)

export default createAppContainer(MainApp);