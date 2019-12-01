import React from 'react';
import { Svg, Path, G, Circle } from 'react-native-svg';
import State from './State';
import data from './StateDimensions';

const GeoChart = () => {
  const fillStateColor = (state: String) => {
    if (state === 'WY' || state === 'OK' || state === 'PA') {
      return '#abcae0';
    }
    if (state === 'MO' || state === 'TX' || state === 'KY') {
      return '#5aa6db';
    }
    if (state === 'NV' || state === 'MD' || state === 'NC') {
      return '#322ee2';
    }
    return '#D3D3D3';
  };

  const buildPaths = () => {
    let paths = [];
    for (let stateKey in data) {
      const path = (
        <State
          key={stateKey}
          dimensions={data[stateKey]['dimensions']}
          fill={fillStateColor(stateKey)}
        />
      );
      paths.push(path);
    }
    return paths;
  };

  return (
    <Svg
      width="959"
      height="593"
      fill="blue"
      stroke="red"
      color="green"
      viewBox="0 0 959 593"
    >
      <G>{buildPaths()}</G>
    </Svg>
  );
};

export default GeoChart;
