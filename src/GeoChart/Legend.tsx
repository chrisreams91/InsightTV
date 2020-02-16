import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  colorDictionary: { [key: number]: string };
  style?: {};
}
const styles = StyleSheet.create({
  text: { fontSize: 50 },
});

const Legend: React.FunctionComponent<Props> = props => {
  const { title, style = {} } = props;
  return (
    <View>
      <Text style={{ ...styles.text, ...style }}>{title}</Text>
    </View>
  );
};
export default Legend;
