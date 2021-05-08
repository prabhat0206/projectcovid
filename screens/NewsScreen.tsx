import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  useColorScheme,
  ImageBackground,
  Linking,
} from 'react-native';
import {TopBar} from '../components/otherScreenTopBar';
import {dummyNews, blurImage} from '../components/Data';
import {RFPercentage} from 'react-native-responsive-fontsize';
import moment from 'moment';

interface Props {
  darkMode: boolean;
  route: any;
}

interface State {
  news: any[];
  page: number;
  isNext: boolean;
  isLoading: boolean;
  isServerAvailable: boolean;
}

export default function (props: any) {
  const darkMode = useColorScheme() === 'dark';
  return <NewsScreen {...props} darkMode={darkMode} />;
}

export class NewsScreen extends React.Component<Props> {
  state: State;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      news: [],
      page: 1,
      isNext: true,
      isLoading: false,
      isServerAvailable: true,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps: Props, prevState: State) {}

  componentWillUnmount() {
    this.setState({news: null});
  }

  async openUrl(url: string) {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    }
  }

  render() {
    const {darkMode, route} = this.props;
    const {newsData} = route.params;
    const backColor = darkMode ? '#121212' : '#rgba(255,255,255, 0.87)';
    const componentColor = darkMode ? '#242424' : '#ffffff';
    const textColor = darkMode ? '#fff' : '#000';
    return (
      <ImageBackground
        source={blurImage}
        style={{flex: 1, width: '100%'}}
        blurRadius={80}>
        <View style={[styles.NewsComponent, {backgroundColor: backColor}]}>
          <TopBar
            name="Covid Related News"
            textColor={textColor}
            {...this.props}
          />
          <View style={[styles.newsContainer]}>
            <FlatList
              data={newsData}
              keyExtractor={({publishedAt}, index) => publishedAt}
              ItemSeparatorComponent={() => <View style={{height: 7}} />}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.openUrl(item.url)}
                    style={[styles.NewData, {backgroundColor: componentColor}]}>
                    <View style={styles.newsImg}>
                      <Image
                        source={{uri: item.urlToImage}}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          color: textColor,
                          fontWeight: 'bold',
                          fontSize: RFPercentage(1.9),
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={{
                          color: textColor,
                          fontSize: RFPercentage(1.45),
                          marginTop: 5,
                        }}>
                        {item.description}
                      </Text>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: RFPercentage(1.4),
                          marginTop: 2,
                        }}>
                        {moment(item.publishedAt).fromNow()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  NewLayout: {
    width: '100%',
    height: 405,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  NewsComponent: {
    width: '100%',
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    overflow: 'hidden',
    alignItems: 'center',
  },
  topText: {
    height: 50,
    width: '93%',
    justifyContent: 'center',
    marginBottom: 5,
  },
  newsContainer: {
    flex: 1,
    width: '95%',
    borderRadius: 2,
  },
  bottomText: {
    height: 35,
    width: '92%',
    paddingTop: 5,
  },
  NewData: {
    height: 120,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 17,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  newsImg: {
    width: 120,
    borderRadius: 10,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
});
