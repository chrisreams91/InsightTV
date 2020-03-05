import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 30,
    backgroundColor: 'red',
  },
  description: {
    fontSize: 30,
  },
  legendRowContainer: { padding: 20 },
  legendRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  legendRowColorSwatch: { width: 40, height: 40, borderRadius: 8 },
  legendRowText: { fontSize: 30, marginLeft: 20 },
});

interface Props {
  legendKey: { [key: number]: string };
  description?: string;
  style?: {};
}

const Legend: React.FunctionComponent<Props> = ({
  description = '',
  legendKey,
  style = {},
}: Props) => {
  const legendRows = Object.keys(legendKey)
    .map(Number)
    .map(key => (
      <View style={styles.legendRow}>
        <View
          style={{
            ...styles.legendRowColorSwatch,
            backgroundColor: legendKey[key],
          }}
        />
        <Text style={styles.legendRowText}>- {key}</Text>
      </View>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.legendRowContainer}>{legendRows}</View>
      <Text style={{ ...style, ...styles.description }}>* {description}</Text>
    </View>
  );
};
export default Legend;
