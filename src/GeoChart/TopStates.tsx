import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 30,
    backgroundColor: 'red',
  },
  header: { fontSize: 35, marginVertical: 10 },
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
  const highestStates: number[] = Object.values(data)
    .sort((a, b) => b - a)
    .slice(0, 5);

  // wow this is janky as fuck
  const sortedData = highestStates.map(count => {
    return Object.keys(data)
      .map(x => {
        if (data[x] === count) {
          return `${x} - ${count}`;
        } else {
          return false;
        }
      })
      .filter(Boolean)
      .flatMap(state => <Text style={styles.text}>{state}</Text>);
  });

  return (
    <View style={{ margin: 30, ...style }}>
      <Text style={styles.header}>Top States</Text>
      {sortedData}
    </View>
  );
};
export default TopStates;
