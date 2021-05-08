import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

interface Props {
  backColor: string;
  textColor: string;
  navigation: any;
  isOpen: boolean;
}

export default class TopBar extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
  }
  render() {
    const {isOpen, textColor, navigation} = this.props;
    const icon = isOpen ? 'times' : 'bars';
    return (
      <>
        <View style={style.topBar}>
          <View style={style.logo}>
            <Text style={{color: textColor, fontSize: 20}}>Logo</Text>
          </View>
          <View style={style.menuAndHelpline}>
            <TouchableOpacity
              style={style.menuIcon}
              onPress={() => navigation.openDrawer()}>
              <Icon name={icon} color={textColor} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:+917061644185')}
              style={style.menuIcon}>
              <Icon name="phone" color={textColor} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const style = StyleSheet.create({
  topBar: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  menuAndHelpline: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  menuIcon: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
