import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {drawerItem, blurImage} from './Data';

export const DrawerContent = ({
  porps,
  navigation,
  textColor,
  componentColor,
}: any) => {
  const {height} = Dimensions.get('window');
  const [menuHeight, setMenuHeight] = React.useState(height / 2);
  const [brandHeight, setBrandHeight] = React.useState(90);
  Dimensions.addEventListener('change', () => {
    isPortrait();
  });
  React.useEffect(() => {
    isPortrait();
  });
  const isPortrait = () => {
    const dim = Dimensions.get('window');
    if (dim.width >= dim.height) {
      setBrandHeight(70);
      setMenuHeight(height / 1.5);
    } else {
      setBrandHeight(90);
      setMenuHeight(height / 3);
    }
  };
  return (
    <View style={styles.mainDrawerContainer}>
      <View style={[styles.brandingContainer, {height: brandHeight}]}>
        <View style={styles.brandLogo}>
          <Image
            source={require('../assets/medi.png')}
            style={styles.brandlogo}
          />
        </View>
        <View style={styles.brandText}>
          <Text style={[styles.brandTextColor, {color: textColor}]}>
            Medicaid
          </Text>
        </View>
      </View>

      <View style={[styles.linkContainer, {height: menuHeight}]}>
        <ImageBackground
          source={blurImage}
          blurRadius={80}
          style={styles.imageContainer}>
          <View style={[styles.container, {backgroundColor: componentColor}]}>
            {drawerItem.map(item => (
              <TouchableOpacity
                style={styles.itemComponent}
                key={item.id}
                onPress={() => {
                  {
                    item.name === 'GRAPH REPORTS' || item.name === 'about'
                      ? navigation.navigate('mainhome', {
                          screen: 'inform',
                          params: {headTitle: item.name},
                        })
                      : navigation.navigate('mainhome', {
                          screen: item.name,
                          params: {
                            textColor: textColor,
                            backColor: componentColor,
                          },
                        });
                  }
                }}>
                <View style={styles.itemIcon}>
                  <Icon name={item.icon} size={20} color={textColor} />
                </View>
                <View style={styles.itemLable}>
                  <Text style={[styles.lableStyle, {color: textColor}]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDrawerContainer: {
    flex: 1,
    paddingTop: 40,
  },
  brandingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  brandLogo: {
    width: 65,
  },
  brandlogo: {
    width: 55,
    height: 55,
    borderRadius: 45,
  },
  brandText: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  brandTextColor: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  linkContainer: {
    width: '100%',
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 17,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  itemComponent: {
    flex: 1,
    flexDirection: 'row',
  },
  itemIcon: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLable: {
    justifyContent: 'center',
    flex: 1,
  },
  lableStyle: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
