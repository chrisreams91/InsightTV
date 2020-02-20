import React from 'react';
import { View } from 'react-native';

import LottieView from 'lottie-react-native';

const App = () => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 200, margin: 80 }}>
      <LottieView
        source={require('./src/animations/hourglass.json')}
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
          // backgroundColor: 'blue',
        }}
      />
      <LottieView
        source={require('./src/animations/truck.json')}
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
          // backgroundColor: 'blue',
        }}
      />
      <LottieView
        source={require('./src/animations/loading.json')}
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
          // backgroundColor: 'blue',
        }}
      />
      <LottieView
        source={require('./src/animations/gears.json')}
        autoPlay
        loop
        style={{
          width: 400,
          height: 400,
          // backgroundColor: 'blue',
        }}
      />
    </View>
  );
};

export default App;
