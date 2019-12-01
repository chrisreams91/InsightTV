import { random, range } from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {
  VictoryChart,
  VictoryBar,
  VictoryScatter,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';

/*  
    add the following line to node_modules/@types/victory/index.d.ts to fix type issue
    declare module "victory-native" { export * from "victory" }
*/
class VictoryDemo extends Component<{}, { randomData: Object }> {
  constructor(props: Object) {
    super(props);
    this.state = {
      randomData: this.generateRandomData(),
    };
  }

  componentDidMount() {
    setInterval(this.updateDemoData.bind(this), 3000);
  }

  getStyles() {
    const colors = ['red', 'orange', 'magenta', 'gold', 'blue', 'purple'];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5),
    };
  }

  getTransitionData() {
    const n = random(4, 10);
    return range(n).map(i => ({
      x: i,
      y: random(2, 10),
    }));
  }

  updateDemoData() {
    this.setState({
      randomData: this.generateRandomData(),
    });
  }

  generateRandomData(points: number = 6) {
    return range(1, points + 1).map(i => ({ x: i, y: i + random(-1, 2) }));
  }

  render() {
    return (
      <View style={{ alignItems: 'center', margin: 20, marginTop: 150 }}>
        <Text style={{ marginTop: 50, fontSize: 100 }}>FLEX METRICS !!!!</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center' }}>
            <VictoryChart width={500} theme={VictoryTheme.material}>
              <VictoryBar
                width={500}
                style={{
                  labels: { fontSize: 30 },
                  data: { fill: 'tomato', opacity: 0.5 },
                }}
                data={[
                  { x: 15, y: 20, label: 1, fill: 'red' },
                  { x: 25, y: 30, label: 2, fill: 'orange' },
                  { x: 35, y: 65, label: 3, fill: 'gold' },
                  { x: 45, y: 50, label: 4, fill: 'blue' },
                  { x: 55, y: 40, label: 5, fill: 'cyan' },
                  { x: 65, y: 30, label: 6, fill: 'green' },
                ]}
              />
              <VictoryScatter
                style={{ data: { fill: 'black' } }}
                data={[
                  { x: 15, y: 20 },
                  { x: 25, y: 30 },
                  { x: 35, y: 65 },
                  { x: 45, y: 50 },
                  { x: 55, y: 40 },
                  { x: 65, y: 30 },
                ]}
              />
            </VictoryChart>
          </View>
          <View style={{ alignItems: 'center' }}>
            <VictoryPie
              colorScale="qualitative"
              width={400}
              height={400}
              innerRadius={50}
              labelRadius={120}
              style={{ labels: { fontSize: 30 } }}
              data={this.state.randomData}
              animate={{ duration: 1500 }}
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <VictoryChart width={500}>
              <VictoryScatter
                style={{
                  tickValues: { fontSize: 30 },
                  labels: { fontSize: 30 },
                }}
                data={[
                  {
                    x: 1,
                    y: 3,
                    fill: 'red',
                    symbol: 'plus',
                    size: 6,
                    label: 'Red',
                  },
                  {
                    x: 2,
                    y: 5,
                    fill: 'magenta',
                    size: 9,
                    opacity: 0.4,
                    label: 'Magenta',
                  },
                  {
                    x: 3,
                    y: 4,
                    fill: 'orange',
                    size: 5,
                    label: 'Orange',
                  },
                  {
                    x: 4,
                    y: 2,
                    fill: 'brown',
                    symbol: 'square',
                    size: 6,
                    label: 'Brown',
                  },
                  {
                    x: 5,
                    y: 5,
                    fill: 'black',
                    symbol: 'triangleUp',
                    size: 5,
                    label: 'Black',
                  },
                ]}
              />
            </VictoryChart>
          </View>
        </View>
      </View>
    );
  }
}

export default VictoryDemo;
