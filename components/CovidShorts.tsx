import React from 'react';
import {blurImage} from './Data';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
// https://dl.dropboxusercontent.com/s/hb8g87bo94okxu2/mountains_sky_sunset_peaks_97149_1366x768.jpg
export default class CovidShorts extends React.Component {
  render() {
    return (
      <View style={styles.covidLayout}>
        <TouchableOpacity style={styles.covidComponent}>
          <ImageBackground
            blurRadius={30}
            source={blurImage}
            style={styles.image}>
            <Text style={styles.centeredText}>About Covid-19</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  covidLayout: {
    width: '100%',
    height: 120,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  covidComponent: {
    width: '93%',
    flex: 1,
    borderRadius: 17,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
