import React from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 180,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
  },
});

interface Props {
  onPress: () => void;
  text: string;
}

const TabButton: React.FunctionComponent<Props> = props => {
  const { onPress, text } = props;
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="#abcae0"
      onPress={onPress}
      style={styles.button}
    >
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TabButton;
