import React from 'react';
import { View, Text } from 'react-native';

import TVTabBar from './src/TVTabBar';
import VictoryDemo from './src/VictoryDemo';

const TestTab = () => (
  <View>
    <Text style={{ fontSize: 300 }}>TEST</Text>
  </View>
);

const tabs = [
  {
    key: 'home',
    name: 'home',
    value: <TestTab />,
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
      defaultTabKey="home"
    />
  );
};

export default App;
