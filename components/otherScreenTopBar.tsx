import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RFPercentage} from 'react-native-responsive-fontsize';

export const TopBar = ({navigation, name, textColor}: any) => {
  const icon = 'bars';
  return (
    <View style={style.topBar}>
      <View style={style.logo}>
        <TouchableOpacity
          style={style.menuIcons}
          onPress={() => navigation.goBack()}>
          <Icon name="angle-left" color={textColor} size={30} />
        </TouchableOpacity>
        <View style={style.menuIcon}>
          <Text style={[style.headText, {color: textColor}]}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  topBar: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
  },
  menuAndHelpline: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  menuIcon: {
    width: 200,
    justifyContent: 'center',
  },
  menuIcons: {
    width: 50,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  headText: {
    fontSize: RFPercentage(2.7),
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
