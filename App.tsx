import React from 'react';
import 'react-native-gesture-handler';
import {MainDetail} from './initialScreen/mainDetail';
import Drawer from './routes/Drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, useColorScheme, View} from 'react-native';

interface State {
  isLoading: boolean;
  isFirst: boolean;
}

export default function (props: any) {
  const darkMode = useColorScheme() === 'dark';
  const backColor = darkMode ? '#121212' : '#fff';
  const textColor = darkMode ? '#fff' : '#121212';
  return <App {...props} backColor={backColor} textColor={textColor} />;
}
class App extends React.Component {
  state: State;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isFirst: false,
    };
  }

  async componentDidMount() {
    this.init();
  }
  async init() {
    const name = await AsyncStorage.getItem('first');
    if (name === undefined || name === null) {
      this.setState({isFirst: true, isLoading: false});
    } else {
      this.setState({isFirst: false, isLoading: false});
    }
  }

  async componentDidUpdate() {
    this.init();
  }
  render() {
    const {backColor, textColor}: any = this.props;
    return (
      <View style={{flex: 1, width: '100%'}}>
        {this.state.isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <ActivityIndicator color={textColor} size="large" />
          </View>
        ) : this.state.isFirst ? (
          <MainDetail />
        ) : (
          <Drawer />
        )}
      </View>
    );
  }
}
