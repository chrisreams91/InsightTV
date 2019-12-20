import React from 'react';
import { StyleSheet } from 'react-native';

import {
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
  createContainer,
} from 'victory-native';

/*
    add the following line to node_modules/@types/victory/index.d.ts to fix type issue
    declare module "victory-native" { export * from "victory" }
*/

interface Data {
  name: string;
  value: number;
  date: number;
  label?: string;
}

interface Props {
  height: number;
  width: number;
  data: Data[][];
}

const LineChart: React.StatelessComponent<Props> = props => {
  const { height, width, data } = props;
  const colors = ['red', 'blue', 'purple', 'green'];

  return (
    <VictoryChart
      domainPadding={{ y: 10 }}
      padding={{
        top: 50,
        bottom: 50,
        left: 50,
        right: 100,
      }}
      animate={{
        duration: 5000,
        onLoad: { duration: 1500 },
      }}
      height={height}
      width={width}
    >
      {data.map((dataArray, key) => {
        return (
          <VictoryLine
            key={`line_${Math.random()
              .toString(36)
              .substr(2)}`}
            name={`line_${key}`}
            style={{
              data: { stroke: colors[key], strokeWidth: 5 },
            }}
            data={dataArray}
            x="date"
            y="value"
            labels={d => d.label}
            labelComponent={<VictoryLabel dx={10} dy={15} renderInPortal />}
          />
        );
      })}
    </VictoryChart>
  );
};

export default LineChart;
