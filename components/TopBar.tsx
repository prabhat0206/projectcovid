import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';

interface Props {
  backColor: string;
  textColor: string;
  navigation: any;
  isOpen: boolean;
  overlayColor: string;
}

export default class TopBar extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
  }
  render() {
    const {isOpen, textColor, navigation, overlayColor} = this.props;
    const icon = isOpen ? 'times' : 'bars';
    return (
      <>
        <View style={[style.topBar]}>
          <View style={style.logo}>
            <Image
              source={require('../assets/medi.png')}
              style={{width: 50, height: 50, borderRadius: 50}}
            />
          </View>
          <View style={style.menuAndHelpline}>
            <TouchableOpacity
              style={style.menuIcon}
              onPress={() => navigation.openDrawer()}>
              <Icon name={icon} color={textColor} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:+91-11-23978046')}
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
    height: 70,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 20,
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
