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
  container: { flex: 1, alignItems: 'center' },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 200,
  },
  singleStatsContainer: {
    backgroundColor: 'red',
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
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

interface Props {}

const Home: React.StatelessComponent<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TabButton onPress={() => console.log('Day')} text="Day" />
        <TabButton onPress={() => console.log('Week')} text="Weekly" />
        <TabButton onPress={() => console.log('Month')} text="Month" />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 10,
        }}
      >
        <View style={styles.singleStatsContainer}>
          <SingleStat title="Stat 1" value={12300} />
          <SingleStat title="Stat 2" value={234000} />
          <SingleStat title="Stat 3" value={3450} />
        </View>
        <View style={styles.singleStatsContainer}>
          <SingleStat title="Stat 4" value={122300} />
          <SingleStat title="Stat 5" value={2000} />
          <SingleStat title="Stat 6" value={34511220} />
        </View>
      </View>
    </View>
  );
};

export default Home;
