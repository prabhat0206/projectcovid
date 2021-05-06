import React from 'react';
import 'react-native-gesture-handler';
import Home from './screens/Home';
import Drawer from './routes/Drawer';

export default class App extends React.Component {
  render() {
    return <Drawer />;
  }
}
