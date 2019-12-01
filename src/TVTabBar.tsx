import React, { useState } from 'react';

import { TabBarIOS } from 'react-native';

export interface Tab {
  key: string;
  name: string;
  value: JSX.Element;
}

interface Props {
  barColor: string;
  textColor: string;
  selectedTextColor: string;
  tabs: Tab[];
  defaultTabKey?: string;
}

export const TVTabBar: React.StatelessComponent<Props> = props => {
  const { barColor, textColor, selectedTextColor, tabs, defaultTabKey } = props;
  const [selectedTabKey, setSelectedTabKey] = useState(
    defaultTabKey || tabs[0].key,
  );

  const updateTab = (newTabKey: string) => {
    if (selectedTabKey !== newTabKey) {
      setSelectedTabKey(newTabKey);
    }
  };

  return (
    <TabBarIOS
      unselectedTintColor={textColor}
      tintColor={selectedTextColor}
      barTintColor={barColor}
    >
      {tabs.map(tab => (
        <TabBarIOS.Item
          key={tab.key}
          title={tab.name}
          selected={selectedTabKey === tab.key}
          onPress={() => updateTab(tab.key)}
        >
          {tab.value}
        </TabBarIOS.Item>
      ))}
    </TabBarIOS>
  );
};

export default TVTabBar;
