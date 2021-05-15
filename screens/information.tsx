import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useColorScheme,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {apiAddress, blurImage} from '../components/Data';
import Accordion from 'react-native-collapsible/Accordion';
import Video from 'react-native-video';

interface Props {
  route: any;
  darkMode: boolean;
}

interface State {
  first: string[];
  second: any;
  third: string[];
  forth: string;
  fifth: any;
  sixth: any;
  lastText: string;
  images: any;
  activeSections: [];
  isFAQ: boolean;
  canShowFact: boolean;
  facts: string[];
  faqs: string[];
  loading: boolean;
}

export function Information(props: any) {
  const darkMode = useColorScheme() === 'dark';
  return <InformationComponent {...props} darkMode={darkMode} />;
}

class InformationComponent extends React.Component<Props> {
  state: State;
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      first: [],
      second: {},
      third: [],
      forth: '',
      fifth: {},
      sixth: {},
      lastText: '',
      images: {},
      activeSections: [],
      isFAQ: false,
      canShowFact: false,
      facts: [],
      faqs: [],
      loading: true,
    };
  }

  componentDidMount() {
    const {headTitle} = this.props.route.params;
    switch (headTitle) {
      case 'FAQs':
        this.setState({isFAQ: true});
        this.fetchData(apiAddress(headTitle));
        break;
      case 'FACTS':
        this.setState({canShowFact: true});
        this.fetchData(apiAddress(headTitle));
        break;
      case 'GRAPH REPORTS':
        this.setState({canShowFact: true});
        this.fetchData(apiAddress(headTitle));
        break;
      default:
        this.fetchData(apiAddress(headTitle));
        break;
    }
  }

  componentWillUnmount() {
    this.setState({facts: null, faqs: null});
  }

  fetchData = async (url: string) => {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        if (this.state.isFAQ) {
          this.setState({images: data.images, faqs: data.data});
        } else if (this.state.canShowFact) {
          this.setState({images: data.images, facts: data.data});
        } else {
          this.setState({
            first: data.first,
            second: data.second,
            third: data.third,
            forth: data.forth,
            fifth: data.fifth,
            sixth: data.sixth,
            lastText: data.last_text,
            images: data.images,
          });
        }
      })
      .catch(e => {
        console.log(e),
          Alert.alert('server error, check your internet connection');
      })
      .finally(() => this.setState({loading: false}));
  };

  _updateSections = (activeSections: any) => {
    this.setState({activeSections: activeSections});
  };

  render() {
    const {darkMode, route} = this.props;
    const textColor = darkMode ? 'rgba(255,255,255,0.8)' : '#000';
    const backColor = darkMode ? '#121212' : 'rgba(255,255,255,0.87)';
    const overlayColor = 'rgba(0,0,0,0.3)';
    const componentColor = darkMode ? '#242424' : '#fff';
    const {width, height} = Dimensions.get('window');
    let mostId = 0;
    let lessId = 0;
    let seriousid = 0;
    const {headTitle}: any = route.params;
    const defaultSrc = require('../assets/default.png');
    const {
      first,
      second,
      third,
      forth,
      fifth,
      sixth,
      lastText,
      images,
    } = this.state;
    return this.state.loading ? (
      <View
        style={{
          flex: 1,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
          backgroundColor: backColor,
        }}>
        <ActivityIndicator size="large" color={textColor} />
      </View>
    ) : (
      <ImageBackground
        source={blurImage}
        blurRadius={80}
        style={[styles.mainContainer, {backgroundColor: backColor}]}>
        <View style={[styles.fullOverlay, {backgroundColor: backColor}]}>
          <>
            {!this.state.isFAQ ? (
              !this.state.canShowFact ? (
                <ScrollView
                  style={{flex: 1, width: width, backgroundColor: backColor}}>
                  <HeadCom
                    banner={images.banner}
                    animation={this.state.images.animation}
                    overlayColor={overlayColor}
                    textColor={textColor}
                    headTitle={headTitle}
                  />
                  <View>
                    <View style={[styles.topText]}>
                      <>
                        {/* // first */}
                        {first === null || first === undefined ? null : (
                          <>
                            {first.map(text => {
                              lessId += 1;
                              return (
                                <Text
                                  style={[styles.text, {color: textColor}]}
                                  key={lessId}>
                                  {text}
                                </Text>
                              );
                            })}
                          </>
                        )}
                        {images.image_1 === null ? null : (
                          <Image
                            source={{uri: images.image_1}}
                            defaultSource={defaultSrc}
                            style={styles.componentImage}
                          />
                        )}
                        {/* // second */}
                        {second === null || second === undefined ? null : (
                          <>
                            <Text style={[styles.text, {color: textColor}]}>
                              {second.head}
                            </Text>
                            {second.data.map((data: any) => (
                              <Text
                                style={[styles.listText, {color: textColor}]}
                                key={data}>
                                {data}
                              </Text>
                            ))}
                          </>
                        )}

                        {images.image_2 === null ? null : (
                          <Image
                            resizeMode="stretch"
                            source={{uri: images.image_2}}
                            defaultSource={defaultSrc}
                            style={styles.componentImage}
                          />
                        )}
                        {third === null || third === undefined ? null : (
                          <>
                            {third.map(text => {
                              lessId += 1;
                              return (
                                <Text
                                  key={lessId}
                                  style={[styles.text, {color: textColor}]}>
                                  {text}
                                </Text>
                              );
                            })}
                          </>
                        )}
                        {forth === '' ? null : (
                          <>
                            {forth.split(']').map(text => {
                              lessId += 1;
                              return (
                                <Text
                                  key={lessId}
                                  style={[styles.listText, {color: textColor}]}>
                                  {text}
                                </Text>
                              );
                            })}
                          </>
                        )}

                        {images.image_3 === null ? null : (
                          <Image
                            resizeMode="stretch"
                            source={{uri: images.image_3}}
                            defaultSource={defaultSrc}
                            style={styles.componentImage}
                          />
                        )}

                        {fifth === null || fifth === undefined ? null : (
                          <>
                            <Text style={[styles.text, {color: textColor}]}>
                              {fifth.head}
                            </Text>
                            {fifth.data.split(']').map((text: string) => {
                              lessId += 1;
                              return (
                                <Text
                                  key={lessId}
                                  style={[styles.listText, {color: textColor}]}>
                                  {text}
                                </Text>
                              );
                            })}
                          </>
                        )}

                        {images.image_4 === null ? null : (
                          <Image
                            source={{uri: images.image_4}}
                            defaultSource={defaultSrc}
                            style={styles.componentImage}
                          />
                        )}
                        {sixth === null || sixth === undefined ? null : (
                          <>
                            <Text style={[styles.text, {color: textColor}]}>
                              {sixth.head}
                            </Text>
                            {sixth.data.split(']').map((text: string) => {
                              lessId += 1;
                              return (
                                <Text
                                  key={lessId}
                                  style={[styles.listText, {color: textColor}]}>
                                  {text}
                                </Text>
                              );
                            })}
                          </>
                        )}
                        {images.image_5 === null ? null : (
                          <Image
                            source={{uri: images.image_5}}
                            defaultSource={defaultSrc}
                            style={styles.componentImage}
                          />
                        )}
                        {lastText === '' ? null : (
                          <>
                            {lastText.split(']').map((text: string) => {
                              lessId += 1;
                              return (
                                <Text
                                  key={lessId}
                                  style={[styles.text, {color: textColor}]}>
                                  {text}
                                </Text>
                              );
                            })}
                          </>
                        )}
                        {images.image_6 === null ? null : (
                          <Image
                            source={{uri: images.image_6}}
                            defaultSource={defaultSrc}
                            style={styles.componentImage}
                          />
                        )}
                      </>
                    </View>
                  </View>
                </ScrollView>
              ) : (
                <FlatList
                  data={this.state.facts}
                  style={{flex: 1, width: '100%'}}
                  keyExtractor={(image, index) => image}
                  ListHeaderComponent={
                    <HeadCom
                      banner={images.banner}
                      animation={this.state.images.animation}
                      overlayColor={overlayColor}
                      textColor={textColor}
                      headTitle={headTitle}
                    />
                  }
                  renderItem={({item}: any) => (
                    <View style={styles.topText}>
                      <View key={item} style={styles.factComponent}>
                        <Image
                          resizeMethod="auto"
                          resizeMode="stretch"
                          source={{uri: item}}
                          defaultSource={defaultSrc}
                          style={[
                            styles.componentImage,
                            {
                              width: '100%',
                              height: '100%',
                              borderRadius: 5,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  )}
                />
              )
            ) : (
              <ScrollView>
                <HeadCom
                  banner={this.state.images.banner}
                  animation={this.state.images.animation}
                  overlayColor={overlayColor}
                  textColor={textColor}
                  headTitle={headTitle}
                />
                <View
                  style={{
                    flex: 1,
                    padding: 10,
                  }}>
                  <Accordion
                    sections={this.state.faqs}
                    activeSections={this.state.activeSections}
                    renderSectionTitle={headAcc}
                    renderHeader={section =>
                      accordionQuery(section, textColor, componentColor)
                    }
                    renderContent={section =>
                      accordionAnswer(section, textColor, componentColor)
                    }
                    onChange={this._updateSections}
                  />
                </View>
              </ScrollView>
            )}
          </>
        </View>
      </ImageBackground>
    );
  }
}

export const HeadCom = ({banner, overlayColor, headTitle, animation}: any) => {
  return (
    <ImageBackground
      blurRadius={10}
      source={{uri: banner}}
      style={styles.topImageContainer}>
      <Video
        source={{
          uri: animation,
        }}
        resizeMode="cover"
        muted
        style={{flex: 1, width: '100%'}}
        paused={false}
        repeat={true}
      />
      <View style={[styles.overlay, {backgroundColor: overlayColor}]}>
        <Text style={[styles.HeadText, {color: '#fff'}]}>{headTitle}</Text>
      </View>
    </ImageBackground>
  );
};

const accordionQuery = (
  section: any,
  textColor: string,
  componentColor: string,
) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        padding: 10,
        backgroundColor: componentColor,
        borderRadius: 10,
        width: '100%',
      }}>
      <Text style={{fontSize: RFPercentage(1.9), color: textColor}}>
        {section.query}
      </Text>
    </View>
  );
};

const accordionAnswer = (
  section: any,
  textColor: string,
  componentColor: string,
) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        padding: 10,
        width: '100%',
        backgroundColor: componentColor,
        borderRadius: 10,
      }}>
      <Text
        style={{
          fontSize: RFPercentage(1.7),
          color: textColor,
          textAlign: 'justify',
        }}>
        {section.answer}
      </Text>
    </View>
  );
};

const headAcc = (section: any) => {
  return <View style={{height: 5, width: '100%'}} />;
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  topImageContainer: {
    height: height / 4,
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    zIndex: 1,
  },
  HeadText: {
    marginLeft: 60,
    marginBottom: 60,
    fontSize: RFPercentage(5),
    textTransform: 'uppercase',
  },
  topText: {
    width: '100%',
    overflow: 'hidden',
    padding: 20,
  },
  overlay: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  fullOverlay: {
    flex: 1,
    width: '100%',
  },
  componentImage: {
    width: '100%',
    height: 250,
    borderRadius: 25,
    marginTop: 20,
  },
  text: {
    fontSize: RFPercentage(2.2),
    marginTop: 10,
    textAlign: 'justify',
  },
  listText: {
    fontSize: RFPercentage(1.9),
    marginTop: 5,
    textAlign: 'justify',
  },

  factComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    height: width - 20,
  },
});
