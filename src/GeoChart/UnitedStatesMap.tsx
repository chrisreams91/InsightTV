import React from 'react';
import { Svg, G } from 'react-native-svg';
import { last } from 'lodash';
import stateDimensions from './StateDimensions.json';
// import { Data } from './GeoChart';
import State from './State';

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

interface Props {
  colorRanges: { [index: number]: string };
  range: number;
  data: Data;
}

const UnitedStatesMap: React.FunctionComponent<Props> = ({
  colorRanges,
  range,
  data,
}: Props) => {
  const fillStateColor = (count: number) => {
    const colorRangeKeys = Object.keys(colorRanges)
      .map(Number)
      .filter(key => count >= key);

    const lastKey = last(colorRangeKeys) || 0;
    return colorRanges[lastKey];
  };

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
    <Svg width="1200" height="775">
      <G>{buildMap()}</G>
    </Svg>
  );
};

export default UnitedStatesMap;
