import React from 'react';
import { View, Text } from 'react-native';

import TVTabBar from './src/TVTabBar';
import Home from './src/Home/Home';
import VictoryDemo from './src/VictoryDemo';
import GeoChart from './src/GeoChart/GeoChart';
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
];

const App = () => {
  return (
    <TVTabBar
      barColor="#00a1e0"
      textColor="white"
      selectedTextColor="red"
      tabs={tabs}
      defaultTabKey="Home"
    />
  );
};

export default App;
