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
} from 'react-native';
import {TopBar} from '../components/otherScreenTopBar';
import {dummyNews, blurImage} from '../components/Data';
import {RFPercentage} from 'react-native-responsive-fontsize';

interface Props {
  darkMode: boolean;
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

  componentDidMount() {
    this.fetchNews(this.state.page);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.page !== this.state.page) {
      this.fetchNews(this.state.page);
    }
  }

  async fetchNews(page: number) {
    const url = '';
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
          this.setState({isServerAvailable: false});
        })
        .finally(() => {
          this.setState({isLoading: false});
        });
    }
  }

  render() {
    const descriptionlength = 140;
    const {darkMode} = this.props;
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
              data={dummyNews}
              keyExtractor={({id}, index) => id.toString()}
              ItemSeparatorComponent={() => <View style={{height: 7}} />}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={[styles.NewData, {backgroundColor: componentColor}]}>
                    <View style={styles.newsImg}>
                      <Image
                        source={{uri: item.image}}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text
                        style={{
                          color: textColor,
                          fontWeight: 'bold',
                          fontSize: RFPercentage(2.2),
                        }}>
                        {item.title.length > 55
                          ? `${item.title.slice(0, 55)}...`
                          : item.title}
                      </Text>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: RFPercentage(1.7),
                          marginTop: 5,
                        }}>
                        {item.description.length > descriptionlength
                          ? `${item.description.slice(0, descriptionlength)}...`
                          : item.description}
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
    backgroundColor: 'green',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
});
