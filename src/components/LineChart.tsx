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
      { name: 'A', value: 1, date: 1 },
      { name: 'A', value: 16, date: 2 },
      { name: 'A', value: 18, date: 3 },
      { name: 'A', value: 18, date: 4, label: 'A' },
    ],
    [
      { name: 'B', value: 1, date: 1 },
      { name: 'B', value: 16, date: 2 },
      { name: 'B', value: 15, date: 3 },
      { name: 'B', value: 20, date: 4, label: 'B' },
    ],
    [
      { name: 'C', value: 3, date: 1 },
      { name: 'C', value: 14, date: 2 },
      { name: 'C', value: 18, date: 3 },
      { name: 'C', value: 13, date: 4, label: 'C' },
    ],
    [
      { name: 'D', value: 2, date: 1 },
      { name: 'D', value: 12, date: 2 },
      { name: 'D', value: 15, date: 3 },
      { name: 'D', value: 14, date: 4, label: 'D' },
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
        duration: 5000,
        onLoad: { duration: 1500 },
      }}
      width={600}
      containerComponent={
        <VictoryZoomVoronoiContainer />
        // include the line below in the container tag if you want to show tooltips at each point
      }
    >
      <VictoryAxis tickValues={[1, 2, 3, 4]} />
      <VictoryAxis
        dependentAxis
        tickValues={[10, 15, 20, 25]}
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
