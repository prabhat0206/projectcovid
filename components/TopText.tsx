import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

interface Value {
  color: string;
}

const TopText = ({color}: Value) => {
  return (
    <View style={styles.textContainer}>
      <Text style={{fontSize: 25, color: color}}>Thank you for choosing</Text>
      <Text style={{fontSize: 25, color: color}}>us for your safety</Text>
      <TouchableOpacity>
        <Text style={[styles.buttonBottom, {color: color}]}>know more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: '100%',
    backgroundColor: 'transparent',
  },
  buttonBottom: {
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    textTransform: 'capitalize',
    opacity: 0.8,
  },
});

export default TopText;
