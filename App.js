import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Navigator from './navigations/Navigator';

const AppContainer = createAppContainer(Navigator);

export default function App() {
  StatusBar.setBarStyle('light-content',true);
  return (
      <AppContainer />
  );
}