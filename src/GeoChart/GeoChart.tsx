import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, G } from 'react-native-svg';
import axios from 'axios';
import { last } from 'lodash';

import State from './State';
import Legend from './Legend';
import stateDimensions from './StateDimensions.json';
import { useInterval } from '../util';
import ButtonContainer from '../components/ButtonContainer';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
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

// temp test data
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
//

const ONE_MINUTE = 60000;

const GeoChart: React.FunctionComponent = () => {
  const [data, setData] = useState<Data>(defaultData);
  const [range, setRange] = useState<1 | 7 | 30>(1);

  const fetchData = (timeRange: number) => {
    console.log(`fetching data with range ${range}`);
    axios
      .get(`http://localhost:8080/geochart/${timeRange}`)
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
    fetchData(range);
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

  const fillStateColor = (count: number): any => {
    const keys = Object.keys(colorRanges)
      .map(Number)
      .filter(key => count >= key);

    const key = last(keys) || 0;
    return colorRanges[key];
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

  return (
    <View style={styles.container}>
      <ButtonContainer buttons={[x, y, z]}>
        <Svg width="959" height="593">
          <G>{buildMap()}</G>
        </Svg>
        <Legend
          title="GEOCHART LEGEND!"
          colorDictionary={colorRanges}
          style={styles.text}
        />
      </ButtonContainer>
    </View>
  );
};

export default GeoChart;
