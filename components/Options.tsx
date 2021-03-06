import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Linking,
  Dimensions
} from 'react-native';
import OptionsData from './Data';

interface Props {
  backColor: string;
  textColor: string;
}

export default class Options extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
  }

  async openUrl(url: string) {
    const isOpen = await Linking.canOpenURL(url);
    if (isOpen) {
      await Linking.openURL(url);
    } else {
      console.log('not Supported');
    }
  }
  render() {
    const {backColor, textColor} = this.props;
    const {navigation}: any = this.props;

    return (
      <View style={styles.OptionsContainer}>
        <View style={styles.OptionsItem}>
          {OptionsData.map((item, index) => (
            <View style={styles.OptionsDivider} key={item.id}>
              <ImageBackground
                source={{uri: item.url}}
                blurRadius={30}
                style={[styles.Option, {backgroundColor: backColor}]}>
                <TouchableOpacity
                  style={styles.titlesCom}
                  onPress={() => {
                    if (item.title === 'HOSPITALS') {
                      this.openUrl('geo:0,0?q=hospitals');
                    } else {
                      navigation.navigate('mainhome', {
                        screen: 'inform',
                        params: {headTitle: item.title},
                      });
                    }
                  }}>
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              </ImageBackground>
              <ImageBackground
                source={{uri: item.url2}}
                blurRadius={30}
                style={[styles.Option, {backgroundColor: backColor}]}>
                <TouchableOpacity
                  style={styles.titlesCom}
                  onPress={() =>
                    navigation.navigate('mainhome', {
                      screen: 'inform',
                      params: {headTitle: item.title2},
                    })
                  }>
                  <Text style={styles.title}>{item.title2}</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  OptionsContainer: {
    width: '100%',
    height: height / 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  OptionsItem: {
    width: '93%',
    flex: 1,
  },
  OptionsDivider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  Option: {
    width: '49%',
    borderRadius: 17,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  titlesCom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
