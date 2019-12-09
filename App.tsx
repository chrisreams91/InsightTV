import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TVTabBar from './src/TVTabBar';
import Home from './src/Home/Home';
import VictoryDemo from './src/VictoryDemo';
import GeoChart from './src/GeoChart/GeoChart';
import LineChart from './src/components/LineChart';
import { Tab } from './src/TVTabBar';

const tabs: Tab[] = [
  {
    key: 'Home',
    name: 'Home',
    value: <Home />,
  },
  {
    key: 'GeoChart',
    name: 'GeoChart',
    value: (
      <View style={{ margin: 250 }}>
        <GeoChart />
      </View>
    ),
  },
  {
    key: 'Victory',
    name: 'Victory',
    value: <VictoryDemo />,
  },
  {
    key: 'test',
    name: 'test',
    value: (
      <View style={{ height: 900, marginTop: 300 }}>
        <LineChart />
      </View>
    ),
  },
];

const App = () => {
  return <TVTabBar tabs={tabs} defaultTabKey="test" />;
};

export default App;
