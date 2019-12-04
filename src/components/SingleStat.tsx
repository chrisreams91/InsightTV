import React from 'react';
import {
  Animated,
  Image,
  Platform,
  Button,
  TouchableHighlight,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

interface Props {
  title: string;
  value: string | number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    width: 400,
    borderColor: 'black',
    borderRadius: 1,
    borderWidth: 1,
  },
  textContainerLet: {
    padding: 20,
  },
  textContainerRight: {
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
});

const SingleStat: React.StatelessComponent<Props> = props => {
  const { title, value } = props;
  return (
    <View style={styles.container}>
      <View style={styles.textContainerLet}>
        <Text style={styles.text}>{title}: </Text>
      </View>
      <View style={styles.textContainerRight}>
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
  );
};

export default SingleStat;
