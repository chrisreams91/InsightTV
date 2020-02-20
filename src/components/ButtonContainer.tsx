import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50,
    marginTop: 50,
  },
  buttonContainer: {
    margin: -40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    marginVertical: 50,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 20,
  },
  childrenContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
  },
});

interface Props {
  buttons: JSX.Element[];
  children: any;
}

const ButtonContainer: React.FunctionComponent<Props> = ({
  buttons,
  children,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.box}>
      <View style={styles.buttonContainer}>{buttons}</View>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  </View>
);

export default ButtonContainer;
