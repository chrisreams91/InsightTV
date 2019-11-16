/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TVTabBar from './src/TVTabBar';
import VictoryDemo from './src/VictoryDemo';

const tabs = [
  {
    key: 'home',
    name: 'home',
    value: (
      <View>
        <Text style={{fontSize: 300}}>TEST</Text>
      </View>
    ),
  },
  {
    key: 'Victory',
    name: 'Victory',
    value: <VictoryDemo />,
  },
];

const App: () => React$Node = () => {
  return (
    <TVTabBar
      barColor="#00a1e0"
      textColor="white"
      selectedTextColor="red"
      tabs={tabs}
      defaultTabKey="home"
    />
  );
};

export default App;
