import React from 'react';

import TVTabBar, { Tab } from './src/components/TVTabBar';
import Home from './src/Home/Home';
import GeoChart from './src/GeoChart/GeoChart';
import LottieView from 'lottie-react-native';

const tabs: Tab[] = [
  {
    key: 'Home',
    name: 'Home',
    value: (
      <LottieView
        source={require('./hourglass.json')}
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
          // backgroundColor: 'blue',
        }}
      />
    ),
  },
  {
    key: 'GeoChart',
    name: 'GeoChart',
    value: <GeoChart />,
  },
];

const App = () => {
  return <TVTabBar tabs={tabs} defaultTabKey="Home" />;
};

export default App;
