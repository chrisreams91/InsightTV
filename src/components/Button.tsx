import React from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 180,
    textAlign: 'center',
    marginHorizontal: 25,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
    backgroundColor: '#5ba2cf',
  },
  buttonTextContainer: { justifyContent: 'center', flex: 1 },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
  },
});

interface Props {
  onPress: () => void;
  text: string;
  color?: string;
}

const Button: React.FunctionComponent<Props> = ({
  onPress,
  text,
  color = '#abcae0',
}: Props) => (
  <TouchableHighlight
    activeOpacity={1}
    underlayColor={color}
    onPress={onPress}
    style={styles.button}
  >
    <View style={styles.buttonTextContainer}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  </TouchableHighlight>
);

export default Button;
