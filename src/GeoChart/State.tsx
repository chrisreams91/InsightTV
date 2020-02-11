import React from 'react';
import { Path } from 'react-native-svg';

interface Props {
  dimensions: string;
  fill: string;
}

const State: React.FunctionComponent<Props> = props => {
  const { dimensions, fill } = props;
  return <Path d={dimensions} fill={fill} />;
};

export default State;
