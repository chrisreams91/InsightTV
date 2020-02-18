import React, { useState } from 'react';

import { TabBarIOS } from 'react-native';

export interface Tab {
  key: string;
  name: string;
  value: JSX.Element;
}

interface Props {
  tabs: Tab[];
  defaultTabKey?: string;
}

export const TVTabBar: React.FunctionComponent<Props> = ({
  tabs,
  defaultTabKey,
}: Props) => {
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
      unselectedTintColor="black"
      tintColor="white"
      barTintColor="#bec2bf"
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
