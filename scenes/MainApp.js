import React from 'react';
import { Text, View } from 'react-native';
import MainStyles from '../styles/MainStyles';
import * as colors from '../styles/Colors';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import * as Icon from 'react-native-vector-icons';
import KPointRect from '../components/KPointRect';
import ScanButton from '../components/ScanButton';

const HomeScreen = () => {
  return (
    <View style={MainStyles.container}>
      <View style={{ flex:1,marginHorizontal: 20, height: '100%'}}>
        <View style={{top: 170}}>
          <KPointRect/>
        </View>
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
const MoreScreen = () => {
  return (
    <View style={MainStyles.container}>
      <Text style={MainStyles.head1Text}>More</Text>
    </View>
  );
}



const MainApp = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () =>({
        tabBarIcon: ({focused,tintColor}) => (<Icon.FontAwesome5 name='home' size={25} color={tintColor} />),
      })
    },
    Promotions: {
      screen: PromotionsScreen,
      navigationOptions: () =>({
        tabBarIcon: ({focused,tintColor}) => <Icon.FontAwesome5 name='tags' size={25} color={tintColor} />,
        label: ({ tintColor, focused }) => (
          <Text style={{ color: focused? 'white': 'rgba(255,255,255,0.3)' }}>
            Promotions
          </Text>
        )
      })
    },
    Scan: {
      screen: () => null,
      navigationOptions: () =>({
        tabBarIcon: ({focused}) => <ScanButton/>,
        tabBarLabel: () => null
      })
    },
    Library: {
      screen: LibraryScreen,
      navigationOptions: () =>({
        tabBarIcon: ({focused,tintColor}) => <Icon.FontAwesome5 name='book-reader' size={25} color={tintColor} />,
      })
    },
    More: {
      screen: MoreScreen,
      navigationOptions: () =>({
        tabBarIcon: ({focused,tintColor}) => <Icon.FontAwesome5 name='dot-circle' size={25} color={tintColor} />
      })
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'rgba(255,255,255,0.3)',
      showLabel: true,
      labelStyle: {
        fontSize: 12
      },
      style: {
        position: 'absolute',
        width: '100%',
        height: 60,
        alignItems: 'center',
        backgroundColor: 'rgb(50,50,50)',
      }
    },
  }
)

export default createAppContainer(MainApp);