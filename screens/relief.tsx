import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Button,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {blurImage} from '../components/Data';
import {HeadCom} from './information';
import {RFPercentage} from 'react-native-responsive-fontsize';

interface State {
  isLoading: boolean;
  links: LinkR[];
  images: any;
}

interface LinkR {
  id: number;
  name: string;
  link: string;
}

export default class Relief extends React.Component {
  state: Readonly<State>;
  constructor(props: any) {
    super(props);
    this.state = {isLoading: true, links: [], images: {}};
  }

  async componentDidMount() {
    await fetch(
      'https://dl.dropboxusercontent.com/s/7lnn9hhjl4gd2lu/links.json',
    )
      .then(res => res.json())
      .then(linkarr =>
        this.setState({
          links: linkarr.data,
          images: linkarr.images,
        }),
      )
      .catch(err => Alert.alert('server error, check your internet connection'))
      .finally(() => this.setState({isLoading: false}));
  }

  async openUrl(url: string) {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Link not found');
    }
  }
  render() {
    const {route}: any = this.props;
    const {backColor, textColor} = route.params;

    const overlayColor =
      backColor === '#121212' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
    const componentColor = backColor === '#121212' ? '#242424' : '#fff';
    return (
      <ImageBackground
        source={blurImage}
        blurRadius={80}
        style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, backgroundColor: backColor}}>
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
              <HeadCom
                animation={this.state.images.animation}
                banner={this.state.images.banner}
                overlayColor={overlayColor}
                textColor={textColor}
                headTitle="Relief Fund"
              />
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  // justifyContent: 'center',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '95%',
                    borderRadius: 17,
                    backgroundColor: componentColor,
                    padding: 5,
                    paddingBottom: 30,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      paddingLeft: 10,
                      justifyContent: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: textColor,
                    }}>
                    <Text
                      style={{color: textColor, fontSize: RFPercentage(2.5)}}>
                      Links
                    </Text>
                  </View>
                  {this.state.links.map(links => (
                    <View
                      key={links.id}
                      style={{
                        width: '100%',
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          paddingLeft: 10,
                        }}>
                        <Text
                          style={{
                            color: textColor,
                            fontSize: RFPercentage(1.5),
                          }}>
                          {links.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 150,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Button
                          title="Go To Website"
                          onPress={() => this.openUrl(links.link)}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    );
  }
}
