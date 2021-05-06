import React from 'react';
import TopBar from '../components/TopBar';
import TopText from '../components/TopText';
import Report from '../components/Report';
import Options from '../components/Options';
import News from '../components/News';
import CovidShorts from '../components/CovidShorts';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {blurImage} from '../components/Data';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
  ScrollView,
  ImageBackground,
} from 'react-native';

// -keep class com.facebook.react.turbomodule.** { *; } <- add in proguard rule

export default function (props: any, {navigation}: any) {
  const darkMode = useColorScheme() === 'dark';
  const navigatin = navigation;
  const isOpen = useIsDrawerOpen();
  return (
    <Home
      {...props}
      darkMode={darkMode}
      navigatin={navigatin}
      isOpen={isOpen}
    />
  );
}

interface Props {
  darkMode: boolean;
  navigation: any;
  isOpen: boolean;
}

class Home extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
  }
  render() {
    const darkMode = this.props.darkMode;
    const BackColor = darkMode ? '#121212' : 'rgba(255,255,255,0.89)';
    const componentColor = darkMode ? '#242424' : '#fff';
    const textColor = darkMode ? 'rgba(255,255,255,0.87)' : '#000';
    const barStyle = darkMode ? 'light-content' : 'dark-content';
    const {navigation} = this.props;

    return (
      <ImageBackground
        source={blurImage}
        blurRadius={80}
        style={style.mainContainer}>
        <View style={[style.mainContainer, {backgroundColor: BackColor}]}>
          <StatusBar
            backgroundColor="transparent"
            translucent
            barStyle={barStyle}
          />
          <ScrollView>
            <TopBar
              navigation={navigation}
              backColor={BackColor}
              textColor={textColor}
              isOpen={this.props.isOpen}
            />
            <TopText color={textColor} />
            <Report backColor={componentColor} textColor={textColor} />
            <Options backColor={componentColor} textColor={textColor} />
            <News
              {...this.props}
              backColor={componentColor}
              textColor={textColor}
            />
            <CovidShorts />
            <View style={{height: 30}} />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
});
