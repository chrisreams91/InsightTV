import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignSelf: 'center',
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
});

interface Props {
  lastUpdated: string;
  loading: boolean;
}

const UpdatedStatus: React.FunctionComponent<Props> = ({
  lastUpdated,
  loading,
}: Props) => {
  const text = loading ? 'Updating data...' : `Last updated: ${lastUpdated}`;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {loading && (
        <LottieView
          source={require('../animations/truck.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      )}
    </View>
  );
};

export default UpdatedStatus;
