import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    margin: 30,
    backgroundColor: 'red',
  },
  header: { fontSize: 35, fontWeight: 'bold', marginVertical: 10 },
  dataContainer: {
    alignItems: 'center',
  },
  text: { fontSize: 30 },
});

interface Props {
  data: { [key: string]: number };
  style?: {};
}

const TopStates: React.FunctionComponent<Props> = ({
  data,
  style = {},
}: Props) => {
  const countPerState = _.transform(
    data,
    (result: { [key: string]: string[] }, value, key) => {
      (result[value] || (result[value] = [])).push(key);
    },
  );

  const highestCounts = Object.keys(countPerState)
    .map(Number)
    .sort((a, b) => b - a)
    .slice(0, 5);

  const stateRows = highestCounts
    .map(count =>
      countPerState[count].map(state => ({
        state,
        count,
      })),
    )
    .flat()
    .splice(0, 5)
    .map(state => (
      <Text style={styles.text}>
        {state.state} - {state.count}
      </Text>
    ));

  return (
    <View style={{ ...styles.container, ...style }}>
      <Text style={styles.header}>Top States</Text>
      <View style={styles.dataContainer}>{stateRows}</View>
    </View>
  );
};
export default TopStates;
