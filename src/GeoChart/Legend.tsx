import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  legendKey: { [key: number]: string };
  title?: string;
  style?: {};
}
const styles = StyleSheet.create({
  container: { backgroundColor: 'teal', flex: 1 },
  header: { fontSize: 20 },
  legendRowContainer: { flexDirection: 'row' },
  legendRowColorSwatch: { width: 100, height: 50 },
  legendRowText: { fontSize: 40, marginLeft: 20 },
});

const Legend: React.FunctionComponent<Props> = ({
  title = '',
  legendKey,
  style = {},
}: Props) => {
  const rows = Object.keys(legendKey)
    .map(Number)
    .map(key => (
      <View style={styles.legendRowContainer}>
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
      <Text style={{ ...styles.header, ...style }}>{title}</Text>
      <View>{rows}</View>
    </View>
  );
};
export default Legend;
