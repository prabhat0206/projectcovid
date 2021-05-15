import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TopBar} from '../components/otherScreenTopBar';
import {blurImage, advisoryVideo} from '../components/Data';
import {Thumbnail} from '../components/Thumnail';

interface state {
  is_portrait: boolean;
  data: any[];
  isLoading: boolean;
}

export default class Advisory extends React.Component {
  state: state;
  constructor(props: any) {
    super(props);
    this.state = {
      is_portrait: false,
      data: [],
      isLoading: true,
    };
    Dimensions.addEventListener('change', () => {
      this.setState({is_portrait: this.isPortrait()});
    });
  }

  componentDidMount() {
    this.isPortrait();
    fetch('https://dl.dropboxusercontent.com/s/n3tsjsu7hpqfmgg/videos.json')
      .then(res => res.json())
      .then(data => this.setState({data: data}))
      .catch(e => Alert.alert('server error, check your internet connection'))
      .finally(() => this.setState({isLoading: false}));
  }

  componentDidUpdate(prevProps: any, prevState: state) {
    if (prevState.is_portrait !== this.state.is_portrait) {
      this.isPortrait();
    }
  }

  isPortrait() {
    const size = Dimensions.get('window');
    if (size.width >= size.height) {
      this.setState({is_portrait: true});
      return true;
    } else {
      this.setState({is_portrait: false});
      return false;
    }
  }

  render() {
    const {route}: any = this.props;
    const {backColor, textColor}: any = route.params;
    const componentsback = backColor === '#121212' ? '#242424' : '#fff';
    return (
      <ImageBackground source={blurImage} blurRadius={80} style={styles.Image}>
        <View style={[styles.mainVideos, {backgroundColor: backColor}]}>
          <TopBar {...this.props} textColor={textColor} name={route.name} />
          {this.state.isLoading ? (
            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator color={textColor} size="large" />
            </View>
          ) : this.state.is_portrait ? (
            <FlatList
              key={'#'}
              data={this.state.data}
              style={{flex: 1, width: '100%'}}
              keyExtractor={({id}, index) => id.toString()}
              renderItem={({item}) => (
                <Thumbnail
                  item={item}
                  {...this.props}
                  backColor={componentsback}
                  textColor={textColor}
                />
              )}
              numColumns={2}
            />
          ) : (
            <FlatList
              key={'_'}
              data={this.state.data}
              style={{flex: 1, width: '100%'}}
              keyExtractor={({id}, index) => id.toString()}
              renderItem={({item}) => (
                <Thumbnail
                  item={item}
                  {...this.props}
                  backColor={componentsback}
                  textColor={textColor}
                />
              )}
              numColumns={1}
            />
          )}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  Image: {flex: 1, width: '100%'},
  mainVideos: {
    flex: 1,
    width: '100%',
  },
});
