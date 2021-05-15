import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  useColorScheme,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import TopBar from './TopBar';

const TopText = ({textColor, navigation, BackColor}: any) => {
  const isOpen = useIsDrawerOpen();
  const darkMode = useColorScheme() === 'dark';
  const overlayColor = darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';
  return (
    <ImageBackground
      blurRadius={10}
      source={{
        uri:
          'https://dl.dropboxusercontent.com/s/o48iwqaog7ezpwy/Banner.jpg?dl=0',
      }}
      style={styles.textContainer}>
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingTop: 20,
          backgroundColor: overlayColor,
        }}>
        <TopBar
          navigation={navigation}
          backColor={BackColor}
          textColor={textColor}
          overlayColor={overlayColor}
          isOpen={isOpen}
        />
        <View style={styles.overLay}>
          <Text style={{fontSize: 25, color: textColor}}>
            Support India's fight
          </Text>
          <Text style={{fontSize: 25, color: textColor}}>against Covid-19</Text>
        </View>
      </View>
      {/* <TouchableOpacity>
        <Text style={[styles.buttonBottom, {color: color}]}>know more</Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );
};

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 3.5,
    width: '100%',
    backgroundColor: 'transparent',
  },
  buttonBottom: {
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    textTransform: 'capitalize',
    opacity: 0.8,
  },
  overLay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopText;
