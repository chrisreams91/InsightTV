import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Config from 'react-native-config';

import Legend from './Legend';
import UnitedStatesMap from './UnitedStatesMap';
import stateDimensions from './StateDimensions.json';
import Button from '../components/Button';
import { useInterval } from '../util';
import TopStates from './TopStates';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  contentContainer: { flexDirection: 'row' },
  mapContainer: { alignSelf: 'center', alignContent: 'center' },
  legendContainer: {
    alignItems: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 20,
  },
  lastUpdatedText: { fontSize: 30, alignSelf: 'center' },
});

export interface Data {
  1: { [key: string]: number };
  7: { [key: string]: number };
  30: { [key: string]: number };
}

// vv  temp test data  vv //
const randomData = () => {
  const x: any = {};
  Object.keys(stateDimensions).forEach(key => {
    const randomNum = Math.floor(Math.random() * (200 - 1) + 1);
    x[key] = randomNum;
  });
  return x;
};
const defaultData = {
  1: randomData(),
  7: randomData(),
  30: randomData(),
};
// ^^  temp test data  ^^ //

const ONE_MINUTE = 60000;

const GeoChart: React.FunctionComponent = () => {
  const [data, setData] = useState<Data>(defaultData);
  const [range, setRange] = useState<1 | 7 | 30>(1);
  const [lastUpdated, setLastUpdated] = useState('No data yet.');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('comp did mount');
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (timeRange: number) => {
    console.log(`fetching data with range ${timeRange}`);
    setLoading(true);
    axios
      .get(`${Config.API_URL}/${timeRange}`)
      .then(response => {
        const updatedData = { ...data };
        updatedData[range] = response.data;
        setData(updatedData);
        console.log('updated data: ', updatedData[range]);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useInterval(() => {
    fetchData(1);
    const timestamp = moment().format('h:mm:ss a');
    setLastUpdated(timestamp);
  }, ONE_MINUTE * 15);

  useInterval(() => {
    fetchData(7);
  }, ONE_MINUTE * 60 * 2);

  useInterval(() => {
    fetchData(30);
  }, ONE_MINUTE * 60 * 24);

  const colorRanges: { [index: number]: string } = {
    0: '#e6e6ff',
    10: '#b3b3ff',
    25: '#9999ff',
    50: '#8080ff',
    100: '#6666ff',
    150: '#4d4dff',
    200: '#3333ff',
  };

  const daily = 'so far today';
  const weeklyMonthly = `over the past ${range} days`;
  const legendDescription = `The number of active \n users in each state \n ${
    range === 1 ? daily : weeklyMonthly
  }`;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.legendContainer}>
          <TopStates data={data[range]} />
          <Legend legendKey={colorRanges} description={legendDescription} />
        </View>
        <View style={styles.mapContainer}>
          <UnitedStatesMap
            colorRanges={colorRanges}
            range={range}
            data={data}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => setRange(1)} text="Day" />
        <Button onPress={() => setRange(7)} text="Week" />
        <Button onPress={() => setRange(30)} text="Month" />
      </View>
    </View>
  );
};

export default GeoChart;
