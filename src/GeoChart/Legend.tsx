import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  legendKey: { [key: number]: string };
  title?: string;
  style?: {};
}
const styles = StyleSheet.create({
  container: { flex: 1, marginLeft: 30 },
  header: { fontSize: 40, marginTop: 50, height: 150 },
  legendRowContainer: { alignSelf: 'center' },
  legendRow: { flexDirection: 'row' },
  legendRowColorSwatch: { width: 120, height: 50 },
  legendRowText: { fontSize: 40, marginLeft: 20 },
});

const Legend: React.FunctionComponent<Props> = ({
  title = '',
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
        <Text style={styles.legendRowText}>{key}</Text>
      </View>
    ));

  return (
    <View style={styles.container}>
      <Text style={{ ...style, ...styles.header }}>{title}</Text>
      <View style={styles.legendRowContainer}>{legendRows}</View>
    </View>
  );
};
export default Legend;
