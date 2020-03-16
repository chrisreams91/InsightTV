import React from 'react';

import TVTabBar, { Tab } from './src/components/TVTabBar';
import Home from './src/Home/Home';
import GeoChart from './src/GeoChart/GeoChart';

const tabs: Tab[] = [
  {
    key: 'GeoChart',
    name: 'GeoChart',
    value: <GeoChart />,
  },
  {
    key: 'Home',
    name: 'Home',
    value: <Home />,
  },
];

const App = () => {
  return <TVTabBar tabs={tabs} defaultTabKey="GeoChart" />;
};

export default App;
