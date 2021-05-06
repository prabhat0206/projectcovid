import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class About extends React.Component {
  render() {
    return <View style={styles.mainAbout}></View>;
  }
}

const styles = StyleSheet.create({
  mainAbout: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
});
