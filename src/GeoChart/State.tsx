import React from 'react';
import { Path } from 'react-native-svg';

interface Props {
  dimensions: string;
  fill: string;
}

const State: React.FunctionComponent<Props> = ({ dimensions, fill }: Props) => (
  <Path d={dimensions} fill={fill} scale={1.28} />
);

export default State;
