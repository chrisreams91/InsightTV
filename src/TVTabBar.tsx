import React, { Component, useState } from 'react';

import { TabBarIOS } from 'react-native';

interface Tab {
  key: string;
  name: string;
  value: JSX.Element;
}

export default class TVTabBar extends Component<
  {
    barColor: string;
    textColor: string;
    selectedTextColor: string;
    tabs: Tab[];
    defaultTabKey?: string;
  },
  { selectedTabKey: string }
> {
  state = {
    selectedTabKey: this.props.defaultTabKey || this.props.tabs[0].key,
  };

  updateTab(newTabKey: string) {
    if (this.state.selectedTabKey !== newTabKey) {
      this.setState({
        selectedTabKey: newTabKey,
      });
    }
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor={this.props.textColor}
        tintColor={this.props.selectedTextColor}
        barTintColor={this.props.barColor}
      >
        {this.props.tabs.map(tab => (
          <TabBarIOS.Item
            key={tab.key}
            title={tab.name}
            selected={this.state && this.state.selectedTabKey === tab.key}
            onPress={() => this.updateTab(tab.key)}
          >
            {tab.value}
          </TabBarIOS.Item>
        ))}
      </TabBarIOS>
    );
  }
}
