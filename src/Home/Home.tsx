import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import SingleStat from '../components/SingleStat';
import TabButton from '../components/TabButton';
import axios from 'axios';
import { useInterval } from '../util';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 200,
  },
  singleStatsContainer: { flex: 1, flexDirection: 'row', margin: 10 },
  singleStatsColumn: {
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

const Home: React.StatelessComponent = () => {
  const [data, setData] = useState({ name: '', value: '' });
  const [dateRange, setDateRange] = useState(1);

  const fetchData = async (id: number) => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    setData({ name: data.name, value: String(id) });
  };

  // use interval should fetch the same data every time with no params
  // while datarange will be the trigger for filtering what current data is held

  useInterval(() => {
    fetchData(dateRange);
    console.log(dateRange);
  }, 1000);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TabButton onPress={() => setDateRange(1)} text="Day" />
        <TabButton onPress={() => setDateRange(7)} text="Weekly" />
        <TabButton onPress={() => setDateRange(30)} text="Month" />
      </View>
      <View style={styles.singleStatsContainer}>
        <View style={styles.singleStatsColumn}>
          <SingleStat title={data.name} value={data.value} />
          <SingleStat title="Stat 2" value={234000} />
          <SingleStat title="Stat 3" value={3450} />
        </View>
        <View style={styles.singleStatsColumn}>
          <SingleStat title="Stat 4" value={122300} />
          <SingleStat title="Stat 5" value={2000} />
          <SingleStat title="Stat 6" value={34511220} />
        </View>
      </View>
    </View>
  );
};

export default Home;
