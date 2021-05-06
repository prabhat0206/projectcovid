import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  backColor: string;
  textColor: string;
  item: Item;
}

interface Item {
  id: number;
  url: string;
  name: string;
  video: string;
}

export class Thumbnail extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
  }
  render() {
    const {backColor, textColor, item} = this.props;
    const {navigation}: any = this.props;
    return (
      <View style={styles.thumbnailContainer}>
        <View style={[styles.ThumbnailContainer, {backgroundColor: backColor}]}>
          <ImageBackground
            blurRadius={10}
            source={{uri: item.url}}
            style={[styles.ThumbnailViews]}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() =>
                navigation.navigate('mainhome', {
                  screen: 'videoPlayer',
                  params: {url: item.video},
                })
              }>
              <Icon name="play" color="#fff" size={40} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.textContainer}>
            <Text style={[styles.text, {color: textColor}]}>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumbnailContainer: {
    flex: 1,
    height: 320,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThumbnailContainer: {
    width: '93%',
    flex: 1,
    borderRadius: 17,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  ThumbnailViews: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: '#1f1f1f',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  textContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: RFPercentage(2.2),
    fontWeight: '400',
  },
});
