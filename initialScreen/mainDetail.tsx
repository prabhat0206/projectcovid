import React from 'react';
import {
  Text,
  View,
  useColorScheme,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash from 'react-native-bootsplash';

export const MainDetail = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const darkMode = useColorScheme() === 'dark';
  const backColor = darkMode ? '#121212' : '#ffff';
  const textColor = darkMode ? '#ffffff' : '#121212';
  const FirstSave = async () => {
    setIsLoading(true);
    await AsyncStorage.setItem('first', 'no');
  };
  React.useEffect(() => {
    RNBootSplash.hide();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: backColor,
      }}>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Image
          source={require('../assets/medi.png')}
          style={{width: 100, height: 100, borderRadius: 50}}
        />
        <Text style={{color: textColor, fontSize: 20, marginTop: 20}}>
          Welcome To Medicaid
        </Text>
        <Text style={{color: textColor, fontSize: 20, marginTop: 20}}>
          Support India's fight
        </Text>
        <Text style={{color: textColor, fontSize: 20}}>against Covid-19</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            backgroundColor: 'red',
          }}
          onPress={() => FirstSave()}>
          {isLoading ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Icon name="angle-right" size={30} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
