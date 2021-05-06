import React from 'react';
import {dummyNews} from './Data';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

interface Props {
  backColor: string;
  textColor: string;
}

interface State {
  titlesize: number;
  descriptionsize: number;
  descriptionlength: number;
  currentScreenWidth: number;
}

export default class News extends React.Component<Props> {
  state: State;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      titlesize: 2,
      descriptionsize: 1.5,
      descriptionlength: 80,
      currentScreenWidth: 0,
    };
    Dimensions.addEventListener('change', () => {
      this.setState({currentScreenWidth: Dimensions.get('window').width});
    });
  }
  componentDidMount() {
    this.isPortrait();
  }
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.currentScreenWidth !== this.state.currentScreenWidth) {
      this.isPortrait();
    }
  }
  isPortrait = () => {
    const size = Dimensions.get('window');
    if (size.width >= size.height) {
      this.setState({
        titlesize: 2.5,
        descriptionsize: 2,
        descriptionlength: 150,
        currentScreenWidth: size.width,
      });
    } else {
      this.setState({
        titlesize: 2,
        descriptionsize: 1.5,
        descriptionlength: 100,
        currentScreenWidth: size.width,
      });
    }
  };
  render() {
    const {backColor, textColor} = this.props;
    const {navigation}: any = this.props;
    const {titlesize, descriptionsize, descriptionlength} = this.state;
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
            {dummyNews.slice(0, 3).map(news => (
              <TouchableOpacity style={styles.NewData} key={news.id}>
                <View style={styles.newsImg}>
                  <Image
                    source={{uri: news.image}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text
                    style={{
                      color: textColor,
                      fontWeight: 'bold',
                      fontSize: RFPercentage(titlesize),
                    }}>
                    {news.title.length > 55
                      ? `${news.title.slice(0, 55)}...`
                      : news.title}
                  </Text>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: RFPercentage(descriptionsize),
                      marginTop: 2,
                    }}>
                    {news.description.length > descriptionlength
                      ? `${news.description.slice(0, descriptionlength)}...`
                      : news.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.bottomText}
            onPress={() => navigation.navigate('mainhome', {screen: 'news'})}>
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
});
