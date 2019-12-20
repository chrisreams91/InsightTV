import React from 'react';
import { View } from 'react-native';

import TVTabBar from './src/TVTabBar';
import Home from './src/Home/Home';
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
];

const App = () => {
  return <TVTabBar tabs={tabs} defaultTabKey="Home" />;
};

export default App;
