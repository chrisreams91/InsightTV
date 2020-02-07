import React, { useState } from 'react';
import { Svg, G } from 'react-native-svg';
import State from './State';
import StateDimensions from './StateDimensions.json';
import { useInterval } from '../util';
import axios from 'axios';

interface IStateDimensions {
  [key: string]: {
    dimensions: string;
    abbreviation: string;
    name: string;
  };
}

const tempData = {
  1: { MO: 12, AL: 1, FL: 2 },
  7: { MO: 12, AL: 1, FL: 2 },
  30: { MO: 12, AL: 1, FL: 2 },
};

interface Data {
  1: { [key: string]: number };
  7: { [key: string]: number };
  30: { [key: string]: number };
}

const GeoChart: React.FunctionComponent = () => {
  const [data, setData] = useState<Data>(tempData);
  const [range, setRange] = useState<1 | 7 | 30>(1);

  const fetchData = async (timeRange: number) => {
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
  }, 5000);

  const fillStateColor = (count: number) => {
    switch (true) {
      case count < 5:
        return '#abcae0';
      case count < 10:
        return '#5aa6db';
      case count < 15:
        return '#322ee2';
      default:
        return '#D3D3D3';
    }
  };

  const buildPaths = () => {
    const typedStateDimensions = StateDimensions as IStateDimensions;

    const stateKeys = Object.keys(StateDimensions);
    return stateKeys.map(key => (
      <State
        key={key}
        dimensions={typedStateDimensions[key].dimensions}
        fill={fillStateColor(data[range][key])}
      />
    ));
  };

  return (
    <Svg width="959" height="593">
      <G>{buildPaths()}</G>
    </Svg>
  );
};

export default GeoChart;
