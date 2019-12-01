import React from 'react';
import { Path } from 'react-native-svg';

interface Props {
  key: string;
  dimensions: string;
  fill: string;
}

const State: React.StatelessComponent<Props> = props => {
  const { dimensions, fill } = props;
  return <Path d={dimensions} fill={fill} />;
};

export default State;
