import React from 'react';
import {
  Animated,
  Image,
  Platform,
  Button,
  TouchableHighlight,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';

const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: '60%',
    backgroundColor: '#F5FCFF',
    margin: 'center',
  },
  chart: {
    flex: 1,
  },
});

interface Props {}

// prop reference
// https://github.com/wuxudong/react-native-charts-wrapper/blob/master/lib/BarLineChartBase.js

const LineChartWrapper: React.FunctionComponent<Props> = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={{
            dataSets: [
              {
                values: [
                  { x: 4, y: 135 },
                  { x: 5, y: 100 },
                  { x: 6, y: 98 },
                  { x: 7, y: 105 },
                ],
                label: 'A',
              },
              {
                values: [
                  { x: 4, y: 105 },
                  { x: 5, y: 90 },
                  { x: 6, y: 130 },
                  { x: 7, y: 100 },
                ],
                label: 'B',
              },
              {
                values: [
                  { x: 4, y: 110 },
                  { x: 5, y: 110 },
                  { x: 6, y: 105 },
                  { x: 7, y: 115 },
                ],
                label: 'C',
              },
            ],
          }}
        />
      </View>
    </View>
  );
};

export default LineChartWrapper;
