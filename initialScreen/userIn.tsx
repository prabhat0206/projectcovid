import React from 'react';
import {Text, View, useColorScheme, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function (props: any) {
  const darkMode = useColorScheme() === 'dark';
  return <UserEntry {...props} darkMode={darkMode} />;
}

interface Props {
  darkMode: boolean;
}
interface State {
  country: string;
  state: string;
  isLoading: boolean;
  canSave: boolean;
  isIndia: boolean;
}

export class UserEntry extends React.Component<Props> {
  state: State;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      country: '',
      state: '',
      isLoading: false,
      canSave: false,
      isIndia: false,
    };
  }
  render() {
    const darkMode = this.props.darkMode;
    const backColor = darkMode ? '#121212' : '#fff';
    const textColor = darkMode ? '#fff' : '#121212';
    return (
      <View style={{flex: 1, width: '100%', backgroundColor: backColor}}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Picker
            selectedValue={this.state.country}
            style={{height: 100, width: 150, color: textColor}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({country: itemValue});
            }}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          {this.state.isIndia ? (
            <Picker
              selectedValue={this.state.country}
              style={{height: 100, width: 150, color: textColor}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({country: itemValue});
              }}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          ) : null}
        </View>
        <View
          style={{
            width: '100%',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.canSave ? (
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 40,
              }}>
              <Icon name="angle-right" color="#fff" size={40} />
            </TouchableOpacity>
          ) : null}
        </View>
        {this.state.isLoading ? (
          <View
            style={{
              height: 200,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={textColor} size="large" />
          </View>
        ) : null}
      </View>
    );
  }
}
