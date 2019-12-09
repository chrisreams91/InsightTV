import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  VictoryChart,
  VictoryBar,
  VictoryScatter,
  VictoryTheme,
  VictoryPie,
  VictoryAxis,
  VictoryLabel,
  VictoryZoomVoronoiContainer,
  VictoryLine,
  createContainer,
} from 'victory-native';

/*
    add the following line to node_modules/@types/victory/index.d.ts to fix type issue
    declare module "victory-native" { export * from "victory" }
*/

const styles = StyleSheet.create({});

interface Data {
  name: string;
  value: number;
  date: number;
  label?: string;
}

interface Props {}

const LineChart: React.StatelessComponent<Props> = props => {
  const data: Data[][] = [
    [
      { name: 'A', value: 1, date: 0.1 },
      { name: 'A', value: 2, date: 0.2 },
      { name: 'A', value: 3, date: 0.3 },
      { name: 'A', value: 4, date: 0.4, label: 'A' },
    ],
    [
      { name: 'B', value: 1, date: 0.2 },
      { name: 'B', value: 2, date: 0.3 },
      { name: 'B', value: 3, date: 0.4 },
      { name: 'B', value: 4, date: 0.5, label: 'B' },
    ],
    [
      { name: 'C', value: 1, date: 0.3 },
      { name: 'C', value: 2, date: 0.4 },
      { name: 'C', value: 3, date: 0.5 },
      { name: 'C', value: 4, date: 0.6, label: 'C' },
    ],
    [
      { name: 'D', value: 1, date: 0.4 },
      { name: 'D', value: 2, date: 0.5 },
      { name: 'D', value: 3, date: 0.6 },
      { name: 'D', value: 4, date: 0.7, label: 'D' },
    ],
  ];

  const colors = ['red', 'blue', 'purple', 'green'];

  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');

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
        duration: 2000,
        onLoad: { duration: 1000 },
      }}
      domain={{ x: [1, 4], y: [0, 1] }}
      containerComponent={
        <VictoryZoomVoronoiContainer />
        // include the line below in the container tag if you want to show tooltips at each point
      }
    >
      <VictoryAxis tickValues={[1, 2, 3, 4]} />
      <VictoryAxis
        dependentAxis
        tickValues={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
        tickFormat={t => `${t * 100}%`}
      />
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
            x="value"
            y="date"
            labels={d => d.label}
            labelComponent={<VictoryLabel dx={10} dy={15} renderInPortal />}
          />
        );
      })}
    </VictoryChart>
  );
};

export default LineChart;
