import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Config from 'react-native-config';

import Legend from './Legend';
import UnitedStatesMap from './UnitedStatesMap';
import UpdatedStatus from './UpdatedStatus';
import stateDimensions from './StateDimensions.json';
import ButtonContainer from '../components/ButtonContainer';
import Button from '../components/Button';
import { useInterval } from '../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  mapContainer: {
    // marginLeft: 50,
    // backgroundColor: 'grey',
  },
  legendContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
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
    1: '#ccccff',
    5: '#b3b3ff',
    10: '#9999ff',
    20: '#8080ff',
    35: '#6666ff',
    50: '#4d4dff',
    100: '#3333ff',
    175: '#0000ff',
    250: '#0000cc',
  };

  const day = <Button onPress={() => setRange(1)} text="Day" />;
  const week = <Button onPress={() => setRange(7)} text="Week" />;
  const month = <Button onPress={() => setRange(30)} text="Month" />;

  const daily = 'so far today';
  const weeklyMonthly = `over the past ${range} days`;
  const legendDescription = `The number of active drivers in each state ${
    range === 1 ? daily : weeklyMonthly
  }`;

  return (
    <View style={styles.container}>
      <ButtonContainer buttons={[day, week, month]}>
        <UnitedStatesMap colorRanges={colorRanges} range={range} data={data} />
        <View style={styles.legendContainer}>
          <UpdatedStatus lastUpdated={lastUpdated} loading={loading} />
          <Legend title={legendDescription} legendKey={colorRanges} />
        </View>
      </ButtonContainer>
    </View>
  );
};

export default GeoChart;
