import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Svg, G } from 'react-native-svg';
import axios from 'axios';
import { last } from 'lodash';
import moment from 'moment';
import Config from 'react-native-config';

import State from './State';
import Legend from './Legend';
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
  lastUpdatedText: { fontSize: 30, alignSelf: 'center' },
  text: {
    fontSize: 50,
  },
});

interface StateDimensions {
  [key: string]: {
    dimensions: string;
    abbreviation: string;
    name: string;
  };
}

interface Data {
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
  console.log(Config);
  const fetchData = (timeRange: number) => {
    console.log(`fetching data with range ${timeRange}`);
    axios
      .get(`${Config.API_URL}/${timeRange}`)
      .then(response => {
        const updatedData = { ...data };
        updatedData[range] = response.data;
        setData(updatedData);
        console.log('updated data: ', updatedData[range]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useInterval(() => {
    fetchData(1);
    const timestamp = moment().format('h:mm:ss a');
    setLastUpdated(`Last updated: ${timestamp}`);
  }, ONE_MINUTE * 10);

  useInterval(() => {
    fetchData(7);
  }, ONE_MINUTE * 60 * 2);

  useInterval(() => {
    fetchData(30);
  }, ONE_MINUTE * 60 * 24);

  const colorRanges = {
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

  const fillStateColor = (count: number) => {
    const colorRangeKeys = Object.keys(colorRanges)
      .map(Number)
      .filter(key => count >= key);

    const lastKey = last(colorRangeKeys) || 0;
    return colorRanges[lastKey];
  };

  const x = <Button onPress={() => setRange(1)} text="Day" />;
  const y = <Button onPress={() => setRange(7)} text="Week" />;
  const z = <Button onPress={() => setRange(30)} text="Month" />;

  const buildMap = () => {
    const typedStateDimensions = stateDimensions as StateDimensions;
    const stateKeys = Object.keys(stateDimensions);
    return stateKeys.map(key => (
      <State
        key={key}
        dimensions={typedStateDimensions[key].dimensions}
        fill={fillStateColor(data[range][key])}
      />
    ));
  };

  const daily = 'so far today';
  const weeklyMonthly = `over the past ${range} days`;
  const legendDescription = `The number of active drivers in each state ${
    range === 1 ? daily : weeklyMonthly
  }`;

  return (
    <View style={styles.container}>
      <ButtonContainer buttons={[x, y, z]}>
        <Svg width="1200" height="775" style={styles.mapContainer}>
          <G>{buildMap()}</G>
        </Svg>
        <View style={{ flex: 1 }}>
          <Text style={styles.lastUpdatedText}>{lastUpdated}</Text>
          <Legend
            title={legendDescription}
            legendKey={colorRanges}
            style={styles.text}
          />
        </View>
      </ButtonContainer>
    </View>
  );
};

export default GeoChart;
