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
import SingleStat from '../components/SingleStat';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 300,
  },
  button: {
    height: 80,
    width: 180,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
  },
  singleStatContainer: {
    flex: 1,
  },
});

interface ButtonProps {
  onPress: () => void;
  text: string;
}

const TabButton: React.StatelessComponent<ButtonProps> = props => {
  const { onPress, text } = props;
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="#abcae0"
      onPress={onPress}
      style={styles.button}
    >
      <View>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

interface Props {}

const Home: React.StatelessComponent<Props> = props => {
  return (
    <>
      <View style={styles.singleStatContainer}>
        <SingleStat title="Stat 1" value={12300} />
        <SingleStat title="Stat 2" value={234000} />
        <SingleStat title="Stat 3" value={3450} />
      </View>
      <View style={styles.buttonContainer}>
        <TabButton onPress={() => console.log('Day')} text="Day" />
        <TabButton onPress={() => console.log('Week')} text="Weekly" />
        <TabButton onPress={() => console.log('Month')} text="Month" />
      </View>
    </>
  );
};

export default Home;
