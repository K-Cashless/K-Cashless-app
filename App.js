import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'react-native';
import GetStart from './scenes/GetStart';
import { createAppContainer } from 'react-navigation';
import Navigator from './navigations/Navigator';

const AppContainer = createAppContainer(Navigator);

export default function App() {
  StatusBar.setBarStyle('light-content',true);
  return (
      <AppContainer />
  );
}