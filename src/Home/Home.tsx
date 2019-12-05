import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import SingleStat from '../components/SingleStat';
import TabButton from '../components/TabButton';
import axios from 'axios';
import { number } from 'prop-types';

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

interface Props {}
// interface Data {
//   name: string;
//   value: string;
// }

const Home: React.StatelessComponent<Props> = props => {
  const [data, setData] = useState({ name: '', value: '' });
  const [counter, setCounter] = useState(1);

  const fetchData = async (id: number) => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    setData({ name: data.name, value: data.capture_rate });
  };

  useInterval(() => {
    setCounter(counter + 1);
    fetchData(counter);
    console.log(counter);
  }, 1000);

  function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

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
          <SingleStat title={data.name} value={data.value} />
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
