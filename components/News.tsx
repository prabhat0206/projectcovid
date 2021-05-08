import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import moment from 'moment';

interface Props {
  backColor: string;
  textColor: string;
}

interface State {
  titlesize: number;
  descriptionsize: number;
  currentScreenWidth: number;
  isLoading: boolean;
  isNext: boolean;
  news: any[];
  page: number;
  titleLines: number;
}

export default class News extends React.Component<Props> {
  state: State;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      titlesize: 2,
      descriptionsize: 1.5,
      currentScreenWidth: 0,
      isLoading: true,
      isNext: true,
      news: [],
      page: 1,
      titleLines: 2,
    };
    Dimensions.addEventListener('change', () => {
      this.setState({currentScreenWidth: Dimensions.get('window').width});
    });
  }
  componentDidMount() {
    this.isPortrait();
    this.fetchNews(this.state.page);
  }
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.currentScreenWidth !== this.state.currentScreenWidth) {
      this.isPortrait();
    }
  }

  async fetchNews(page: number) {
    const url = `https://newsapi.org/v2/top-headlines?country=in&q=covid&apiKey=0ccfe402c0ec423fbba485e387374009&page=${page}`;
    if (page === 1) {
      this.setState({isLoading: true});
    }
    if (this.state.isNext) {
      await fetch(url)
        .then(response => response.json())
        .then(news => {
          if (page === 5) {
            this.setState({news: news.articles, isNext: false});
          } else {
            this.setState({news: news.articles, page: page + 1});
          }
        })
        .catch(err => {
          this.setState({isServerAvailable: false, isNext: false});
        })
        .finally(() => {
          this.setState({isLoading: false});
        });
    }
  }

  async openUrl(url: string) {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('News not available');
    }
  }

  isPortrait = () => {
    const size = Dimensions.get('window');
    if (size.width >= size.height) {
      this.setState({
        titlesize: 2.5,
        descriptionsize: 2,
        descriptionlength: 120,
        currentScreenWidth: size.width,
        titleLines: 1,
      });
    } else {
      this.setState({
        titlesize: 1.8,
        descriptionsize: 1.5,
        titleLines: 2,
        descriptionlength: 70,
        currentScreenWidth: size.width,
      });
    }
  };

  componentWillUnmount() {
    this.setState({news: null});
  }
  render() {
    const {backColor, textColor} = this.props;
    const {navigation}: any = this.props;
    const {titlesize, descriptionsize} = this.state;
    return (
      <View style={styles.NewLayout}>
        <View style={[styles.NewsComponent, {backgroundColor: backColor}]}>
          <View style={styles.topText}>
            <Text
              style={{
                fontSize: RFPercentage(2.5),
                color: textColor,
                fontWeight: '400',
              }}>
              Latest Covid-19 News
            </Text>
          </View>
          <View style={styles.newsContainer}>
            {this.state.isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={textColor} size="large" />
              </View>
            ) : (
              <>
                {this.state.news.slice(0, 3).map(news => (
                  <TouchableOpacity
                    onPress={() => this.openUrl(news.url)}
                    style={styles.NewData}
                    key={news.publishedAt}>
                    <View style={styles.newsImg}>
                      <Image
                        source={{uri: news.urlToImage}}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text
                        numberOfLines={this.state.titleLines}
                        ellipsizeMode="tail"
                        style={{
                          color: textColor,
                          fontWeight: 'bold',
                          fontSize: RFPercentage(titlesize),
                        }}>
                        {news.title}
                      </Text>
                      <View>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            color: textColor,
                            fontSize: RFPercentage(descriptionsize),
                          }}>
                          {news.description}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: RFPercentage(descriptionsize),
                          marginTop: 2,
                        }}>
                        {moment(news.publishedAt).fromNow()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
          <TouchableOpacity
            style={styles.bottomText}
            onPress={() =>
              navigation.navigate('mainhome', {
                screen: 'news',
                params: {newsData: this.state.news},
              })
            }>
            <Text style={{fontSize: 15, color: textColor}}>See More</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: '93%',
    flex: 1,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
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
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 8,
  },
  newsImg: {
    width: 130,
    borderRadius: 10,
    backgroundColor: 'green',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  textContainerMain: {
    flex: 1,
  },
});
