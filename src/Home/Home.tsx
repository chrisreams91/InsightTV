import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SingleStat from '../components/SingleStat';
import Button from '../components/Button';
import axios from 'axios';
import { useInterval } from '../util';
import LineChart from '../components/LineChart';

const styles = StyleSheet.create({
  container: {},
  filterContainer: {
    flexDirection: 'row',
    marginTop: 200,
    alignSelf: 'center',
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
  dataContainer: {
    flexDirection: 'row',
    marginTop: 150,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  singleStatsContainer: {
    flexDirection: 'row',
    height: 400,
    backgroundColor: 'orange',
  },
  singleStatsColumn: {},
});

interface Data {
  name: string;
  value: number;
  date: number;
  label?: string;
}
const lineData: Data[][] = [
  [
    { name: 'A', value: 1, date: 1 },
    { name: 'A', value: 6, date: 2 },
    { name: 'A', value: 18, date: 3 },
    { name: 'A', value: 18, date: 4, label: 'A' },
  ],
  [
    { name: 'B', value: 1, date: 1 },
    { name: 'B', value: 16, date: 2 },
    { name: 'B', value: 15, date: 3 },
    { name: 'B', value: 24, date: 4, label: 'B' },
  ],
  [
    { name: 'C', value: 3, date: 1 },
    { name: 'C', value: 14, date: 2 },
    { name: 'C', value: 18, date: 3 },
    { name: 'C', value: 13, date: 4, label: 'C' },
  ],
  [
    { name: 'D', value: 2, date: 1 },
    { name: 'D', value: 12, date: 2 },
    { name: 'D', value: 15, date: 3 },
    { name: 'D', value: 14, date: 4, label: 'D' },
  ],
];
const Home: React.FunctionComponent = () => {
  const [data, setData] = useState(lineData);

  const fetchData = async () => {
    // const { data } = await axios.get(
    //   `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    // );
  };

  const filterData = (range: number) => {
    const newData = data;
    newData[3].map(point => (point.value = range));
    setData(newData);
  };

  // use interval should fetch the same data every time with no params
  // while datarange will be the trigger for filtering what current data is held
  useInterval(() => {
    // console.log('use interval');
    // fetchData();
  }, 25000);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Button onPress={() => filterData(1)} text="Day" />
        <Button onPress={() => filterData(7)} text="Weekly" />
        <Button onPress={() => filterData(30)} text="Month" />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.singleStatsContainer}>
          <View style={styles.singleStatsColumn}>
            <SingleStat title="stat 1" value={12345} />
            <SingleStat title="Stat 2" value={234000} />
            <SingleStat title="Stat 3" value={3450} />
          </View>
          <View style={styles.singleStatsColumn}>
            <SingleStat title="Stat 4" value={122300} />
            <SingleStat title="Stat 5" value={2000} />
            <SingleStat title="Stat 6" value={34511220} />
          </View>
        </View>
        <LineChart height={600} width={600} data={data} />
      </View>
    </View>
  );
};

export default Home;
