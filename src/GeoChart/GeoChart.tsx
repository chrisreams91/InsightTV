import React, { useState } from 'react';
import { Text } from 'react-native';
import { Svg, G } from 'react-native-svg';
import State from './State';
import stateDimensions from './StateDimensions.json';
import { useInterval } from '../util';
import axios from 'axios';

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

const defaultData = {
  1: { MO: 10, TX: 40, FL: 14 },
  7: {},
  30: {},
};

const ONE_MINUTE = 60000;

const GeoChart: React.FunctionComponent = () => {
  const [data, setData] = useState<Data>(defaultData);
  const [range, setRange] = useState<1 | 7 | 30>(1);

  const fetchData = async (timeRange: number) => {
    console.log('fetching data....');
    // handle errors here later
    const response = await axios.get(
      `http://localhost:8080/geochart/${timeRange}`,
    );

    const updatedData = { ...data };
    updatedData[range] = response.data;
    console.log('updated data: ', updatedData[1]);
    setData(updatedData);
  };

  useInterval(() => {
    fetchData(1);
  }, ONE_MINUTE);

  // useInterval(() => {
  //   fetchData(7);
  // }, ONE_MINUTE * 60);

  // useInterval(() => {
  //   fetchData(30);
  // }, ONE_MINUTE * 60 * 24);

  const colorDictionary = {
    0: '#D3D3D3',
    1: '#e6e6ff',
    5: '#ccccff',
    10: '#b3b3ff',
    20: '#9999ff',
    35: '#8080ff',
    50: '#6666ff',
    100: '#4d4dff',
    175: '#3333ff',
    250: '#0000ff',
  };

  const fillStateColor = (count: number) => {
    const keys = Object.keys(colorDictionary)
      .map(Number)
      .filter(key => count >= key)
      .sort();
    if (keys.length) {
      console.log(keys);
    }
    const key = keys[keys.length - 1] || '0';
    return colorDictionary[key];

    // switch (true) {
    //   case count < 1:
    //     return '#e6e6ff';
    //   case count < 5:
    //     return '#ccccff';
    //   case count < 10:
    //     return '#b3b3ff';
    //   case count < 20:
    //     return '#9999ff';
    //   case count < 35:
    //     return '#8080ff';
    //   case count < 50:
    //     return '#6666ff';
    //   case count < 100:
    //     return '#4d4dff';
    //   case count < 150:
    //     return '#3333ff';
    //   case count < 225:
    //     return '#0000ff';
    //   default:
    //     return '#D3D3D3';
    // }
  };

  const buildPaths = () => {
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
    <>
      <Svg width="959" height="593">
        <G>{buildPaths()}</G>
      </Svg>
      <Text>RANGE: {range}</Text>
    </>
  );
};

export default GeoChart;
