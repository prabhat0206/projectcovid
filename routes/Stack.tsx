import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Relief from '../screens/relief';
import Advisory from '../screens/advisory';
import {VideoPlayer} from '../components/VideoPlayer';
import NewsScreen from '../screens/NewsScreen';
import {Information} from '../screens/information';

export const StackScreens = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="home" component={Home} />
      <stack.Screen name="advisory videos" component={Advisory} />
      <stack.Screen name="relief fund" component={Relief} />
      <stack.Screen name="videoPlayer" component={VideoPlayer} />
      <stack.Screen name="news" component={NewsScreen} />
      <stack.Screen name="inform" component={Information} />
    </stack.Navigator>
  );
};
