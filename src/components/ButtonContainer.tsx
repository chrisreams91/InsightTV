import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabButton from './TabButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    margin: 50,
  },
  buttonContainer: {
    margin: -40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    margin: 50,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  childrenContainer: {
    margin: 50,
    // borderColor: 'black',
    // borderStyle: 'solid',
    // borderWidth: 3,
  },
});

interface Props {
  buttons: typeof TabButton[];
  children: JSX.Element;
}

const ButtonContainer: React.FunctionComponent<any> = props => {
  const { buttons, children } = props;
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.buttonContainer}>{buttons}</View>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    </View>
  );
};

export default ButtonContainer;
