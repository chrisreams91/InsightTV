import React, {Component} from 'react';

import {TabBarIOS} from 'react-native';

type Tab = {
  key: string,
  name: string,
  value: Object,
};

export default class TVTabBar extends Component<
  {
    barColor: string,
    textColor: string,
    selectedTextColor: string,
    tabs: Tab[],
    defaultTabKey?: string,
  },
  {
    selectedTabKey: string,
  },
> {
  static defaultProps = {
    defaultTabKey: '',
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      selectedTabKey: this.props.defaultTabKey || this.props.tabs[0].key,
    };
  }

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
        barTintColor={this.props.barColor}>
        {this.props.tabs.map(t => (
          <TabBarIOS.Item
            key={t.key}
            title={t.name}
            selected={this.state && this.state.selectedTabKey === t.key}
            onPress={() => this.updateTab(t.key)}>
            {t.value}
          </TabBarIOS.Item>
        ))}
      </TabBarIOS>
    );
  }
}
